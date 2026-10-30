import React from "react";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  X,
  FolderKanban,
  ChevronRight,
  Bell,
} from "lucide-react";

const Sidebar = ({
  activePage = "dashboard",
  setActivePage,
  mobileOpen = false,
  setMobileOpen,
  pendingClients = 0,
  runningAds = 0,
}) => {
  // ================================
  // SIDEBAR MENU
  // ================================

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      label: "All Clients",
      icon: Users,
      badge: pendingClients > 0 ? pendingClients : null,
    },
    {
      id: "ads",
      label: "Meta Ads",
      icon: Megaphone,
      badge: runningAds > 0 ? runningAds : null,
    },
    {
      id: "calendar",
      label: "Content Calendar",
      icon: CalendarDays,
    },
    {
      id: "reports",
      label: "Monthly Reports",
      icon: BarChart3,
    },
  ];

  // ================================
  // BOTTOM MENU
  // ================================

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  // ================================
  // HANDLE MENU CLICK
  // ================================

  const handleMenuClick = (pageId) => {
    if (setActivePage) {
      setActivePage(pageId);
    }

    // Mobile par menu click hone ke baad
    // sidebar automatically close ho jayega
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  // ================================
  // MENU BUTTON
  // ================================

  const MenuButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = activePage === item.id;

    return (
      <button
        onClick={() => handleMenuClick(item.id)}
        className={`
          group relative flex w-full items-center gap-3
          rounded-xl px-4 py-3
          text-left text-sm font-medium
          transition-all duration-200

          ${
            isActive
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
              : "text-slate-400 hover:bg-slate-900 hover:text-white"
          }
        `}
      >
        {/* Active Left Line */}
        {isActive && (
          <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-indigo-400" />
        )}

        {/* Icon */}
        <Icon
          size={20}
          strokeWidth={isActive ? 2.3 : 2}
          className="shrink-0"
        />

        {/* Label */}
        <span className="flex-1 truncate">
          {item.label}
        </span>

        {/* Badge */}
        {item.badge !== null &&
          item.badge !== undefined && (
            <span
              className={`
                flex min-w-[24px] items-center justify-center
                rounded-full px-2 py-0.5
                text-xs font-bold

                ${
                  isActive
                    ? "bg-white text-indigo-600"
                    : "bg-red-500 text-white"
                }
              `}
            >
              {item.badge}
            </span>
          )}

        {/* Arrow */}
        <ChevronRight
          size={16}
          className={`
            transition-all duration-200
            ${
              isActive
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }
          `}
        />
      </button>
    );
  };

  return (
    <>
      {/* =====================================
          MOBILE BACKGROUND OVERLAY
      ====================================== */}

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen &&
            setMobileOpen(false)
          }
          className="
            fixed inset-0 z-40
            bg-black/60 backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          border-r border-slate-800
          bg-slate-950 text-white
          shadow-2xl

          transition-transform duration-300 ease-in-out

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================
            LOGO / BRAND
        ====================================== */}

        <div
          className="
            flex h-20 shrink-0
            items-center justify-between
            border-b border-slate-800
            px-5
          "
        >
          <div className="flex items-center gap-3">
            {/* Logo Icon */}

            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-indigo-600
                shadow-lg shadow-indigo-950/50
              "
            >
              <FolderKanban
                size={23}
                strokeWidth={2.2}
              />
            </div>

            {/* Brand */}

            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">
                MarketFlow
              </h1>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Digital Marketing Manager
              </p>
            </div>
          </div>

          {/* Mobile Close */}

          <button
            onClick={() =>
              setMobileOpen &&
              setMobileOpen(false)
            }
            className="
              rounded-lg p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================
            MONTHLY TARGET SMALL BOX
        ====================================== */}

        <div className="px-4 pt-5">
          <div
            className="
              rounded-2xl
              border border-slate-800
              bg-slate-900/80
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Monthly Target
                </p>

                <p className="mt-1 text-xl font-bold text-white">
                  22
                  <span className="ml-1 text-xs font-normal text-slate-500">
                    / Client
                  </span>
                </p>
              </div>

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-indigo-500/10
                  text-indigo-400
                "
              >
                <BarChart3 size={20} />
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[70%] rounded-full bg-indigo-500" />
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              Reel + Post monthly target
            </p>
          </div>
        </div>

        {/* =====================================
            MAIN NAVIGATION
        ====================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p
            className="
              mb-3 px-3
              text-[10px] font-bold
              uppercase tracking-[0.18em]
              text-slate-600
            "
          >
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <MenuButton
                key={item.id}
                item={item}
              />
            ))}
          </nav>

          {/* =====================================
              WORK ALERT BOX
          ====================================== */}

          {pendingClients > 0 && (
            <div
              className="
                mt-7 rounded-2xl
                border border-red-500/20
                bg-red-500/5
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-red-500/10
                    text-red-400
                  "
                >
                  <Bell size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Work Alert
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {pendingClients} client
                    {pendingClients > 1 ? "s are" : " is"} below
                    monthly target.
                  </p>

                  <button
                    onClick={() =>
                      handleMenuClick("dashboard")
                    }
                    className="
                      mt-2 text-xs
                      font-semibold
                      text-red-400
                      hover:text-red-300
                    "
                  >
                    View Alerts →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =====================================
            BOTTOM SECTION
        ====================================== */}

        <div
          className="
            shrink-0
            border-t border-slate-800
            p-4
          "
        >
          {/* Settings */}

          <div className="mb-3 space-y-1">
            {bottomMenuItems.map((item) => (
              <MenuButton
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* =====================================
              ADMIN PROFILE
          ====================================== */}

          <div
            className="
              rounded-2xl
              border border-slate-800
              bg-slate-900
              p-3
            "
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}

              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-500
                  to-purple-600
                  text-sm font-bold
                  text-white
                "
              >
                A
              </div>

              {/* Details */}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  Admin
                </p>

                <p className="truncate text-[11px] text-slate-500">
                  Digital Marketing
                </p>
              </div>

              {/* Logout */}

              <button
                title="Logout"
                className="
                  rounded-lg p-2
                  text-slate-500
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <LogOut size={17} />
              </button>
            </div>
          </div>

          {/* Version */}

          <p className="mt-3 text-center text-[10px] text-slate-700">
            MarketFlow v1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;