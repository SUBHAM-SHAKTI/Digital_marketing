import React, { useEffect, useMemo, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ClientFolder from "./pages/ClientFolder";

import { initialClients } from "./data/initialClients";

// ======================================================
// LOCAL STORAGE KEYS
// ======================================================

const CLIENTS_STORAGE_KEY = "marketflow_clients";
const MONTH_STORAGE_KEY = "marketflow_selected_month";

// ======================================================
// GET CURRENT MONTH
// Example: September 2026
// ======================================================

const getCurrentMonth = () => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());
};

// ======================================================
// LOAD CLIENTS FROM LOCAL STORAGE
// ======================================================

const getStoredClients = () => {
  try {
    const storedClients = localStorage.getItem(
      CLIENTS_STORAGE_KEY
    );

    if (storedClients) {
      const parsedClients = JSON.parse(storedClients);

      if (Array.isArray(parsedClients)) {
        return parsedClients;
      }
    }
  } catch (error) {
    console.error(
      "Failed to load clients from localStorage:",
      error
    );
  }

  return initialClients;
};

// ======================================================
// LOAD SELECTED MONTH
// ======================================================

const getStoredMonth = () => {
  try {
    const storedMonth = localStorage.getItem(
      MONTH_STORAGE_KEY
    );

    if (storedMonth) {
      return storedMonth;
    }
  } catch (error) {
    console.error(
      "Failed to load selected month:",
      error
    );
  }

  return getCurrentMonth();
};

// ======================================================
// APP
// ======================================================

function App() {
  // ====================================================
  // CLIENT DATA
  // ====================================================

  const [clients, setClients] = useState(
    getStoredClients
  );

  // ====================================================
  // SELECTED MONTH
  // ====================================================

  const [selectedMonth, setSelectedMonth] =
    useState(getStoredMonth);

  // ====================================================
  // CURRENT PAGE
  // ====================================================

  const [activePage, setActivePage] =
    useState("dashboard");

  // ====================================================
  // SELECTED CLIENT
  // ====================================================

  const [selectedClientId, setSelectedClientId] =
    useState(null);

  // ====================================================
  // MOBILE SIDEBAR
  // ====================================================

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // ====================================================
  // SAVE CLIENTS TO LOCAL STORAGE
  // ====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CLIENTS_STORAGE_KEY,
        JSON.stringify(clients)
      );
    } catch (error) {
      console.error(
        "Failed to save clients:",
        error
      );
    }
  }, [clients]);

  // ====================================================
  // SAVE SELECTED MONTH
  // ====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        MONTH_STORAGE_KEY,
        selectedMonth
      );
    } catch (error) {
      console.error(
        "Failed to save selected month:",
        error
      );
    }
  }, [selectedMonth]);

  // ====================================================
  // GET SELECTED CLIENT
  // ====================================================

  const selectedClient = useMemo(() => {
    if (!selectedClientId) {
      return null;
    }

    return clients.find(
      (client) =>
        String(client.id) ===
        String(selectedClientId)
    );
  }, [clients, selectedClientId]);

  // ====================================================
  // CLIENT MONTH DATA
  // ====================================================

  const getClientMonthData = (client) => {
    const target =
      Number(client?.monthlyTarget) || 22;

    const monthWorks =
      client?.works?.filter(
        (work) =>
          work.month === selectedMonth
      ) || [];

    // Only Posted Reel + Posted Post
    // count towards monthly target.

    const postedWorks = monthWorks.filter(
      (work) =>
        work.status === "Posted" &&
        (work.type === "Reel" ||
          work.type === "Post")
    );

    const completed = postedWorks.length;

    const monthAds =
      client?.ads?.filter(
        (ad) =>
          ad.month === selectedMonth
      ) || [];

    const runningAds = monthAds.filter(
      (ad) => ad.status === "Running"
    ).length;

    return {
      target,
      completed,
      runningAds,
    };
  };

  // ====================================================
  // PENDING CLIENT COUNT
  // ====================================================

  const pendingClients = useMemo(() => {
    return clients.filter((client) => {
      const data =
        getClientMonthData(client);

      return data.completed < data.target;
    }).length;
  }, [clients, selectedMonth]);

  // ====================================================
  // RUNNING ADS COUNT
  // ====================================================

  const runningAds = useMemo(() => {
    return clients.reduce(
      (total, client) => {
        const data =
          getClientMonthData(client);

        return total + data.runningAds;
      },
      0
    );
  }, [clients, selectedMonth]);

  // ====================================================
  // OPEN CLIENT FOLDER
  // ====================================================

  const handleOpenClient = (client) => {
    if (!client) return;

    setSelectedClientId(client.id);

    setActivePage("client-folder");

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ====================================================
  // BACK TO DASHBOARD
  // ====================================================

  const handleBackToDashboard = () => {
    setSelectedClientId(null);

    setActivePage("dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ====================================================
  // ADD WORK
  // ====================================================

  const handleAddWork = (
    clientId,
    newWork
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          works: [
            ...(client.works || []),
            newWork,
          ],
        };
      })
    );
  };

  // ====================================================
  // UPDATE WORK
  // NEW
  // ====================================================

  const handleUpdateWork = (
    clientId,
    workId,
    updatedWork
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          works: (client.works || []).map(
            (work) => {
              if (
                String(work.id) !==
                String(workId)
              ) {
                return work;
              }

              return {
                ...work,
                ...updatedWork,

                // Original ID always keep
                id: work.id,

                updatedAt:
                  new Date().toISOString(),
              };
            }
          ),
        };
      })
    );
  };

  // ====================================================
  // ADD META AD
  // ====================================================

  const handleAddAd = (
    clientId,
    newAd
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          ads: [
            ...(client.ads || []),
            newAd,
          ],
        };
      })
    );
  };

  // ====================================================
  // UPDATE META AD
  // NEW
  // ====================================================

  const handleUpdateAd = (
    clientId,
    adId,
    updatedAd
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          ads: (client.ads || []).map(
            (ad) => {
              if (
                String(ad.id) !==
                String(adId)
              ) {
                return ad;
              }

              return {
                ...ad,
                ...updatedAd,

                // Original ID always keep
                id: ad.id,

                updatedAt:
                  new Date().toISOString(),
              };
            }
          ),
        };
      })
    );
  };

  // ====================================================
  // DELETE WORK
  // ====================================================

  const handleDeleteWork = (
    clientId,
    workId
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          works: (
            client.works || []
          ).filter(
            (work) =>
              String(work.id) !==
              String(workId)
          ),
        };
      })
    );
  };

  // ====================================================
  // DELETE META AD
  // ====================================================

  const handleDeleteAd = (
    clientId,
    adId
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) => {
        if (
          String(client.id) !==
          String(clientId)
        ) {
          return client;
        }

        return {
          ...client,

          ads: (
            client.ads || []
          ).filter(
            (ad) =>
              String(ad.id) !==
              String(adId)
          ),
        };
      })
    );
  };

  // ====================================================
  // UPDATE CLIENT
  // ====================================================

  const handleUpdateClient = (
    clientId,
    updatedData
  ) => {
    setClients((previousClients) =>
      previousClients.map((client) =>
        String(client.id) ===
        String(clientId)
          ? {
              ...client,
              ...updatedData,
            }
          : client
      )
    );
  };

  // ====================================================
  // ADD NEW CLIENT
  // ====================================================

  const handleAddClient = (
    clientData
  ) => {
    const newClient = {
      id:
        typeof crypto !== "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now(),

      name:
        clientData?.name ||
        "New Client",

      companyName:
        clientData?.companyName || "",

      category:
        clientData?.category || "",

      phone:
        clientData?.phone || "",

      email:
        clientData?.email || "",

      instagram:
        clientData?.instagram || "",

      facebook:
        clientData?.facebook || "",

      website:
        clientData?.website || "",

      monthlyTarget:
        Number(
          clientData?.monthlyTarget
        ) || 22,

      works: [],

      ads: [],

      createdAt:
        new Date().toISOString(),
    };

    setClients((previous) => [
      ...previous,
      newClient,
    ]);

    return newClient;
  };

  // ====================================================
  // DELETE CLIENT
  // ====================================================

  const handleDeleteClient = (
    clientId
  ) => {
    setClients((previous) =>
      previous.filter(
        (client) =>
          String(client.id) !==
          String(clientId)
      )
    );

    if (
      String(selectedClientId) ===
      String(clientId)
    ) {
      handleBackToDashboard();
    }
  };

  // ====================================================
  // RESET ALL DATA
  // ====================================================

  const handleResetData = () => {
    const confirmReset =
      window.confirm(
        "Are you sure? All client work and Meta Ads data will be deleted."
      );

    if (!confirmReset) {
      return;
    }

    setClients(initialClients);

    setSelectedClientId(null);

    setActivePage("dashboard");

    try {
      localStorage.removeItem(
        CLIENTS_STORAGE_KEY
      );
    } catch (error) {
      console.error(
        "Reset error:",
        error
      );
    }
  };

  // ====================================================
  // HANDLE SIDEBAR PAGE
  // ====================================================

  const handleSetActivePage = (
    page
  ) => {
    setMobileOpen(false);

    if (page === "dashboard") {
      setSelectedClientId(null);

      setActivePage("dashboard");

      return;
    }

    if (page === "clients") {
      setSelectedClientId(null);

      setActivePage("clients");

      return;
    }

    if (page === "ads") {
      setSelectedClientId(null);

      setActivePage("ads");

      return;
    }

    if (page === "calendar") {
      setSelectedClientId(null);

      setActivePage("calendar");

      return;
    }

    if (page === "reports") {
      setSelectedClientId(null);

      setActivePage("reports");

      return;
    }

    if (page === "settings") {
      setSelectedClientId(null);

      setActivePage("settings");

      return;
    }

    setActivePage(page);
  };

  // ====================================================
  // PLACEHOLDER PAGE
  // ====================================================

  const PlaceholderPage = ({
    title,
    description,
  }) => {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
              🚀
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>

            <button
              type="button"
              onClick={() =>
                handleSetActivePage(
                  "dashboard"
                )
              }
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ====================================================
  // PAGE CONTENT
  // ====================================================

  const renderPage = () => {
    // ==================================================
    // CLIENT FOLDER
    // ==================================================

    if (
      activePage === "client-folder" &&
      selectedClient
    ) {
      return (
        <ClientFolder
          client={selectedClient}
          selectedMonth={selectedMonth}
          setSelectedMonth={
            setSelectedMonth
          }
          onBack={
            handleBackToDashboard
          }

          // CONTENT
          onAddWork={
            handleAddWork
          }
          onUpdateWork={
            handleUpdateWork
          }
          onDeleteWork={
            handleDeleteWork
          }

          // META ADS
          onAddAd={
            handleAddAd
          }
          onUpdateAd={
            handleUpdateAd
          }
          onDeleteAd={
            handleDeleteAd
          }

          // CLIENT UPDATE
          onUpdateClient={
            handleUpdateClient
          }

          setMobileOpen={
            setMobileOpen
          }
        />
      );
    }

    // ==================================================
    // DASHBOARD
    // ==================================================

    if (
      activePage === "dashboard"
    ) {
      return (
        <Dashboard
          clients={clients}
          selectedMonth={
            selectedMonth
          }
          setSelectedMonth={
            setSelectedMonth
          }
          onOpenClient={
            handleOpenClient
          }
          setMobileOpen={
            setMobileOpen
          }
          onAddClient={
            handleAddClient
          }
          onDeleteClient={
            handleDeleteClient
          }
          onUpdateClient={
            handleUpdateClient
          }
        />
      );
    }

    // ==================================================
    // CLIENTS
    // ==================================================

    if (
      activePage === "clients"
    ) {
      return (
        <Dashboard
          clients={clients}
          selectedMonth={
            selectedMonth
          }
          setSelectedMonth={
            setSelectedMonth
          }
          onOpenClient={
            handleOpenClient
          }
          setMobileOpen={
            setMobileOpen
          }
          onAddClient={
            handleAddClient
          }
          onDeleteClient={
            handleDeleteClient
          }
          onUpdateClient={
            handleUpdateClient
          }
        />
      );
    }

    // ==================================================
    // ADS
    // ==================================================

    if (activePage === "ads") {
      return (
        <PlaceholderPage
          title="Meta Ads Manager"
          description="All clients ke Meta Ads campaigns ek hi screen par manage karne ka page yahan add hoga."
        />
      );
    }

    // ==================================================
    // CALENDAR
    // ==================================================

    if (
      activePage === "calendar"
    ) {
      return (
        <PlaceholderPage
          title="Content Calendar"
          description="Reels, Posts, Stories aur scheduled content ka monthly calendar yahan show hoga."
        />
      );
    }

    // ==================================================
    // REPORTS
    // ==================================================

    if (
      activePage === "reports"
    ) {
      return (
        <PlaceholderPage
          title="Monthly Reports"
          description="Client-wise monthly content report, social links, Meta Ads performance aur spend report yahan generate hoga."
        />
      );
    }

    // ==================================================
    // SETTINGS
    // ==================================================

    if (
      activePage === "settings"
    ) {
      return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage MarketFlow application
              settings.
            </p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-slate-900">
                Application Data
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Current data is stored in
                your browser using
                localStorage.
              </p>

              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm font-bold text-red-700">
                  Reset Application
                </p>

                <p className="mt-1 text-xs leading-5 text-red-600">
                  This will remove all work
                  and advertisement records
                  and restore the original
                  clients.
                </p>

                <button
                  type="button"
                  onClick={
                    handleResetData
                  }
                  className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Reset All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ==================================================
    // FALLBACK
    // ==================================================

    return (
      <Dashboard
        clients={clients}
        selectedMonth={
          selectedMonth
        }
        setSelectedMonth={
          setSelectedMonth
        }
        onOpenClient={
          handleOpenClient
        }
        setMobileOpen={
          setMobileOpen
        }
        onAddClient={
          handleAddClient
        }
        onDeleteClient={
          handleDeleteClient
        }
        onUpdateClient={
          handleUpdateClient
        }
      />
    );
  };

  // ====================================================
  // APP UI
  // ====================================================

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SIDEBAR */}

      <Sidebar
        activePage={
          activePage ===
          "client-folder"
            ? "clients"
            : activePage
        }
        setActivePage={
          handleSetActivePage
        }
        mobileOpen={
          mobileOpen
        }
        setMobileOpen={
          setMobileOpen
        }
        pendingClients={
          pendingClients
        }
        runningAds={
          runningAds
        }
      />

      {/* MAIN CONTENT */}

      <div className="min-h-screen lg:pl-72">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;