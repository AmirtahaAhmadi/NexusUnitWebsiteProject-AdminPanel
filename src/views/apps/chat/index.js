// ** React Imports
import { Fragment, useState, useEffect, useCallback } from "react";

// ** Chat App Component Imports
import Chat from "./Chat";
import Sidebar from "./SidebarLeft";
import UserProfileSidebar from "./UserProfileSidebar";

// ** Third Party Components
import classnames from "classnames";

// ** APIs
import {
  sendSupportMessage,
  addTicketOverview,
  acceptTicket,
} from "../../../core/Interceptor/Services/Adminticketservice/post";
import {
  getAllTickets,
  getAllTicketsNotAccepted,
  getChatDetailUser,
} from "../../../core/Interceptor/Services/Adminticketservice/get";
import toast from "react-hot-toast";
import "@styles/base/pages/app-chat.scss";
import "@styles/base/pages/app-chat-list.scss";

const SUPPORT_SENDER_ID = 11;
const mapTicketToChatItem = (ticket) => {
  const rawMessages = Array.isArray(ticket.ticketMessages)
    ? ticket.ticketMessages
    : [];

  const chatMessages = rawMessages.map((m) => ({
    senderId:
      m.sender === "support" || m.senderType === "support"
        ? SUPPORT_SENDER_ID
        : ticket.id,
    message: m.text ?? m.message ?? "",
    time: m.insetDate ?? m.createdAt ?? new Date(),
  }));

  const last = chatMessages[chatMessages.length - 1];

  const displayName =
    ticket.userFullName || ticket.problem || `تیکت #${ticket.id}`;

  // اینجا باشد
  const isAccepted = !!ticket.supporterId;

  return {
    id: ticket.id,
    originalTicket: ticket,
    supporterId: ticket.supporterId,
    isDone: ticket.isDone,
    fullName: displayName,
    avatar: ticket.userAvatar || "/images/avatars/1.png",

    status: isAccepted ? "online" : "busy",

    chat: {
      id: ticket.id,
      chat: chatMessages,
      lastMessage: last ? { message: last.message, time: last.time } : null,
      unseenMsgs: ticket.unseenMsgs || 0,
    },

    contact: {
      id: ticket.id,
      fullName: displayName,
      avatar: ticket.userAvatar || "/images/avatars/1.png",
      status: isAccepted ? "online" : "busy",
      about: ticket.describe || "",
      isDone: !!ticket.isDone,
    },
  };
};

const extractTicketList = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.items)) return raw.items;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.data?.items)) return raw.data.items;
  if (Array.isArray(raw?.result)) return raw.result;
  if (Array.isArray(raw?.data?.result)) return raw.data.result;
  if (Array.isArray(raw?.content)) return raw.content;
  if (Array.isArray(raw?.data?.content)) return raw.data.content;
  return null;
};

const AppChat = () => {
  const [chatData, setChatData] = useState({
    chats: [],
    contacts: [],
    userProfile: {},
    selectedUser: {},
  });

  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };

  const handleUser = (obj) => setUser(obj);

  const fetchTickets = useCallback(
    async (searchQuery = query, pageNumber = 1, perPage = 10) => {
      setIsLoading(true);

      try {
        const [acceptedRes, notAcceptedRes] = await Promise.all([
          getAllTickets({
            pageNumber,
            perPage,
            query: searchQuery.trim(),
          }),
          getAllTicketsNotAccepted({
            pageNumber,
            perPage,
            query: searchQuery.trim(),
          }),
        ]);

        const accepted = extractTicketList(acceptedRes.data) || [];
        const notAccepted = extractTicketList(notAcceptedRes.data) || [];
        console.log("accepted", accepted.length, accepted);
        console.log("notAccepted", notAccepted.length, notAccepted);
        const uniqueTickets = [
          ...accepted,
          ...notAccepted.filter(
            (ticket) => !accepted.some((t) => t.id === ticket.id),
          ),
        ];

        uniqueTickets.sort(
          (a, b) =>
            new Date(b.updateDate || b.insetDate) -
            new Date(a.updateDate || a.insetDate),
        );

        const mapped = uniqueTickets.map(mapTicketToChatItem);

        setChatData((prev) => ({
          ...prev,
          chats: mapped,
          selectedUser: prev.selectedUser?.id
            ? mapped.find((x) => x.id === prev.selectedUser.id) ||
              prev.selectedUser
            : prev.selectedUser,
        }));
      } catch (error) {
        console.error(error);
        toast.error("دریافت تیکت‌ها انجام نشد");
      } finally {
        setIsLoading(false);
      }
    },
    [query],
  );

  useEffect(() => {
    fetchTickets();
  }, []);
  const handleSearch = async (value) => {
    setQuery(value);
    fetchTickets(value);
  };
  const handleAcceptTicket = async (ticketId) => {
    try {
      await acceptTicket(ticketId);

      toast.success("تیکت تایید شد");

      await fetchTickets();

      const detailResult = await getChatDetailUser(ticketId);

      setChatData((prev) => ({
        ...prev,
        selectedUser: {
          ...prev.selectedUser,
          originalTicket: detailResult.data,
          supporterId: detailResult.data.supporterId,
        },
      }));
    } catch (err) {
      console.error(err);
      toast.error("خطا در تایید تیکت");
    }
  };
  const handleSelectChat = async (id) => {
    const selected = chatData.chats.find((item) => item.id === id);
    if (!selected) return;

    try {
      let ticket = selected.originalTicket;

      const detailResult = await getChatDetailUser(ticket.id);
      const detail = detailResult.data;

      const updatedSelected = {
        ...selected,
        originalTicket: detail,
        chat: {
          ...selected.chat,
          id: detail.id,
          chat:
            detail.ticketMessages?.map((m) => ({
              id: m.id,
              message: m.text,
              senderId: m.userId,
              time: m.insetDate,
            })) || [],
        },
      };

      setChatData((prev) => ({
        ...prev,
        selectedUser: updatedSelected,
        chats: prev.chats.map((item) =>
          item.id === id ? updatedSelected : item,
        ),
      }));
    } catch (error) {
      console.error("خطا در باز کردن تیکت:", error?.response?.data || error);
      toast.error("باز کردن تیکت انجام نشد");
    }
  };

  const handleSendMsg = async (obj) => {
    const ticketId = obj?.chat?.id ?? obj?.id;
    const text = obj.message;
    if (!ticketId || !text?.trim()) return;

    try {
      const result = await sendSupportMessage({ text, ticketId });
      const success = result?.data?.success ?? result?.data ?? true;

      if (success) {
        setChatData((prev) => {
          const selectedUser = { ...prev.selectedUser };

          if (selectedUser.chat) {
            selectedUser.chat = {
              ...selectedUser.chat,
              chat: [
                ...selectedUser.chat.chat,
                {
                  id: result.data.id,
                  message: text,
                  time: new Date(),
                  senderId: SUPPORT_SENDER_ID,
                },
              ],
            };
          }

          const chats = prev.chats.map((item) =>
            item.id === selectedUser.id ? selectedUser : item,
          );

          return { ...prev, selectedUser, chats };
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "خطایی در ارسال پیام رخ داد";
      console.error("خطا در ارسال پیام:", error?.response?.data || error);
      toast.error(message);
    }
  };

  const handleCloseTicket = async ({ overview, rate, solved }) => {
    const ticketId =
      chatData.selectedUser?.chat?.id ?? chatData.selectedUser?.id;
    if (!ticketId) return;

    try {
      const result = await addTicketOverview({
        overview,
        rate,
        solved,
        ticketId,
      });

      if (result) {
        setChatData((prev) => {
          const selectedUser = prev.selectedUser?.contact
            ? {
                ...prev.selectedUser,
                contact: { ...prev.selectedUser.contact, isDone: true },
                status: "offline",
              }
            : prev.selectedUser;

          const chats = prev.chats.map((item) =>
            item.id === ticketId ? { ...item, status: "offline" } : item,
          );

          return { ...prev, selectedUser, chats };
        });
      }
    } catch (error) {
      console.error("خطا در ثبت بازخورد تیکت:", error?.response?.data || error);
    }
  };

  return (
    <Fragment>
      <Sidebar
        chatData={chatData}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
        handleSelectChat={handleSelectChat}
        onSearch={handleSearch}
        isLoading={isLoading}
        duplicateWarning={duplicateWarning}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames("body-content-overlay", {
                show:
                  userSidebarRight === true ||
                  sidebar === true ||
                  userSidebarLeft === true,
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              chatData={chatData}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
              handleSendMsg={handleSendMsg}
              handleCloseTicket={handleCloseTicket}
              handleAcceptTicket={handleAcceptTicket}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppChat;
