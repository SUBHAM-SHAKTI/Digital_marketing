
import React, { useEffect, useState } from "react";

import {
  X,
  CalendarDays,
  Megaphone,
  IndianRupee,
  Users,
  Eye,
  Target,
  Link2,
  FileText,
  Save,
  PlayCircle,
  Clock3,
  PauseCircle,
  CheckCircle2,
  CircleAlert,
  Pencil,
  PlusCircle,
  BarChart3,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

// ======================================================
// INITIAL FORM DATA
// ======================================================

const initialFormData = {
  campaignName: "",

  startDate: "",
  endDate: "",

  platform: "Both",

  status: "Scheduled",

  budget: "",
  spend: "",

  reach: "",
  impressions: "",
  leads: "",

  adUrl: "",

  notes: "",
};

// ======================================================
// ADD / EDIT META AD MODAL
// ======================================================

const AddAdModal = ({
  isOpen,
  onClose,
  onSave,

  selectedMonth = "September 2026",
  clientName = "Client",

  // Existing ad while editing
  editingAd = null,
}) => {
  // ====================================================
  // STATE
  // ====================================================

  const [formData, setFormData] =
    useState(initialFormData);

  const [error, setError] =
    useState("");

  // ====================================================
  // EDIT MODE
  // ====================================================

  const isEditMode =
    Boolean(editingAd);

  // ====================================================
  // LOAD DATA
  // ====================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setError("");

    // ================================================
    // EDIT EXISTING AD
    // ================================================

    if (editingAd) {
      setFormData({
        campaignName:
          editingAd.campaignName ||
          "",

        startDate:
          editingAd.startDate ||
          "",

        endDate:
          editingAd.endDate ||
          "",

        platform:
          editingAd.platform ||
          "Both",

        status:
          editingAd.status ||
          "Scheduled",

        budget:
          editingAd.budget ??
          "",

        spend:
          editingAd.spend ??
          "",

        reach:
          editingAd.reach ??
          "",

        impressions:
          editingAd.impressions ??
          "",

        leads:
          editingAd.leads ??
          "",

        adUrl:
          editingAd.adUrl ||
          "",

        notes:
          editingAd.notes ||
          "",
      });

      return;
    }

    // ================================================
    // NEW AD
    // ================================================

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setFormData({
      ...initialFormData,

      startDate: today,
    });
  }, [isOpen, editingAd]);

  // ====================================================
  // ESC KEY + BODY SCROLL
  // ====================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen, onClose]);

  // ====================================================
  // DON'T RENDER
  // ====================================================

  if (!isOpen) {
    return null;
  }

  // ====================================================
  // HANDLE INPUT
  // ====================================================

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setError("");

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // ====================================================
  // SELECT PLATFORM
  // ====================================================

  const handlePlatformSelect = (
    platform
  ) => {
    setError("");

    setFormData(
      (previous) => ({
        ...previous,
        platform,
      })
    );
  };

  // ====================================================
  // SELECT STATUS
  // ====================================================

  const handleStatusSelect = (
    status
  ) => {
    setError("");

    setFormData(
      (previous) => ({
        ...previous,
        status,
      })
    );
  };

  // ====================================================
  // VALID URL
  // ====================================================

  const isValidUrl = (
    value
  ) => {
    if (!value?.trim()) {
      return true;
    }

    try {
      const url = new URL(
        value.trim()
      );

      return (
        url.protocol ===
          "http:" ||
        url.protocol ===
          "https:"
      );
    } catch {
      return false;
    }
  };

  // ====================================================
  // NUMBER VALIDATION
  // ====================================================

  const isValidPositiveNumber = (
    value
  ) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return true;
    }

    const number =
      Number(value);

    return (
      !Number.isNaN(number) &&
      number >= 0
    );
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");

    // ================================================
    // CAMPAIGN NAME
    // ================================================

    if (
      !formData.campaignName.trim()
    ) {
      setError(
        "Please enter campaign name."
      );

      return;
    }

    // ================================================
    // START DATE
    // ================================================

    if (!formData.startDate) {
      setError(
        "Please select campaign start date."
      );

      return;
    }

    // ================================================
    // END DATE CHECK
    // ================================================

    if (
      formData.endDate &&
      formData.endDate <
        formData.startDate
    ) {
      setError(
        "End date cannot be before start date."
      );

      return;
    }

    // ================================================
    // PLATFORM
    // ================================================

    if (!formData.platform) {
      setError(
        "Please select ad platform."
      );

      return;
    }

    // ================================================
    // STATUS
    // ================================================

    if (!formData.status) {
      setError(
        "Please select campaign status."
      );

      return;
    }

    // ================================================
    // NUMERIC VALIDATION
    // ================================================

    const numericFields = [
      {
        key: "budget",
        label: "Budget",
      },

      {
        key: "spend",
        label: "Spend",
      },

      {
        key: "reach",
        label: "Reach",
      },

      {
        key: "impressions",
        label: "Impressions",
      },

      {
        key: "leads",
        label: "Leads",
      },
    ];

    for (
      const field of
      numericFields
    ) {
      if (
        !isValidPositiveNumber(
          formData[field.key]
        )
      ) {
        setError(
          `${field.label} cannot be negative.`
        );

        return;
      }
    }

    // ================================================
    // URL
    // ================================================

    if (
      formData.adUrl &&
      !isValidUrl(
        formData.adUrl
      )
    ) {
      setError(
        "Please enter a valid Meta Ad URL starting with http:// or https://"
      );

      return;
    }

    // ================================================
    // CREATE FINAL OBJECT
    // ================================================

    const adData = {
      id:
        editingAd?.id ??
        (typeof crypto !==
          "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now()),

      month:
        editingAd?.month ||
        selectedMonth,

      campaignName:
        formData.campaignName.trim(),

      startDate:
        formData.startDate,

      endDate:
        formData.endDate,

      platform:
        formData.platform,

      status:
        formData.status,

      budget:
        Number(
          formData.budget
        ) || 0,

      spend:
        Number(
          formData.spend
        ) || 0,

      reach:
        Number(
          formData.reach
        ) || 0,

      impressions:
        Number(
          formData.impressions
        ) || 0,

      leads:
        Number(
          formData.leads
        ) || 0,

      adUrl:
        formData.adUrl.trim(),

      notes:
        formData.notes.trim(),

      createdAt:
        editingAd?.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    // ================================================
    // SEND TO CLIENT FOLDER
    // ================================================

    if (
      typeof onSave ===
      "function"
    ) {
      onSave(adData);
    }
  };

  // ====================================================
  // PLATFORM OPTIONS
  // ====================================================

  const platformOptions = [
    {
      name: "Instagram",
      icon: FaInstagram,
      description:
        "Instagram Ads",
    },

    {
      name: "Facebook",
      icon: FaFacebookF,
      description:
        "Facebook Ads",
    },

    {
      name: "Both",
      icon: Megaphone,
      description:
        "Instagram + Facebook",
    },
  ];

  // ====================================================
  // STATUS OPTIONS
  // ====================================================

  const statusOptions = [
    {
      name: "Scheduled",
      icon: Clock3,
      description:
        "Campaign scheduled",
    },

    {
      name: "Running",
      icon: PlayCircle,
      description:
        "Campaign active",
    },

    {
      name: "Paused",
      icon: PauseCircle,
      description:
        "Campaign paused",
    },

    {
      name: "Ended",
      icon: CheckCircle2,
      description:
        "Campaign completed",
    },
  ];

  // ====================================================
  // UI
  // ====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose?.();
        }
      }}
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-slate-100
            px-5
            py-5
            sm:px-6
          "
        >
          <div className="flex items-start gap-3">
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl

                ${
                  isEditMode
                    ? "bg-orange-50 text-orange-600"
                    : "bg-indigo-50 text-indigo-600"
                }
              `}
            >
              {isEditMode ? (
                <Pencil
                  size={21}
                />
              ) : (
                <Megaphone
                  size={21}
                />
              )}
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                {clientName}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {isEditMode
                  ? "Edit Meta Ad"
                  : "Add Meta Ad"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {selectedMonth}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================== */}

        <form
          id="ad-form"
          onSubmit={
            handleSubmit
          }
          className="
            flex-1
            space-y-6
            overflow-y-auto
            p-5
            sm:p-6
          "
        >
          {/* ERROR */}

          {error && (
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-red-200
                bg-red-50
                p-4
                text-red-700
              "
            >
              <CircleAlert
                size={19}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {/* EDIT MESSAGE */}

          {isEditMode && (
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-orange-100
                bg-orange-50
                p-4
              "
            >
              <Pencil
                size={18}
                className="mt-0.5 shrink-0 text-orange-600"
              />

              <div>
                <p className="text-sm font-bold text-orange-700">
                  Editing Meta Ad
                </p>

                <p className="mt-1 text-xs leading-5 text-orange-600">
                  Status, spend,
                  reach, impressions
                  aur leads update
                  kar sakte ho.
                  Changes dashboard
                  par automatically
                  update honge.
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              CAMPAIGN NAME
          ================================================== */}

          <div>
            <Label required>
              Campaign Name
            </Label>

            <div className="relative mt-2">
              <Megaphone
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="campaignName"
                value={
                  formData.campaignName
                }
                onChange={
                  handleChange
                }
                placeholder="Example: September Lead Campaign"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>
          </div>

          {/* =================================================
              DATES
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* START */}

            <div>
              <Label required>
                Start Date
              </Label>

              <div className="relative mt-2">
                <CalendarDays
                  size={17}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="date"
                  name="startDate"
                  value={
                    formData.startDate
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />
              </div>
            </div>

            {/* END */}

            <div>
              <Label>
                End Date
              </Label>

              <div className="relative mt-2">
                <CalendarDays
                  size={17}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="date"
                  name="endDate"
                  value={
                    formData.endDate
                  }
                  onChange={
                    handleChange
                  }
                  min={
                    formData.startDate
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              PLATFORM
          ================================================== */}

          <div>
            <Label required>
              Ad Platform
            </Label>

            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {platformOptions.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    formData.platform ===
                    item.name;

                  return (
                    <button
                      key={
                        item.name
                      }
                      type="button"
                      onClick={() =>
                        handlePlatformSelect(
                          item.name
                        )
                      }
                      className={`
                        rounded-2xl
                        border
                        p-4
                        text-left
                        transition-all

                        ${
                          active
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }
                      `}
                    >
                      <Icon
                        size={20}
                        className={
                          active
                            ? "text-indigo-600"
                            : "text-slate-400"
                        }
                      />

                      <p
                        className={`
                          mt-3
                          text-sm
                          font-bold

                          ${
                            active
                              ? "text-indigo-700"
                              : "text-slate-700"
                          }
                        `}
                      >
                        {
                          item.name
                        }
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {
                          item.description
                        }
                      </p>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              STATUS
          ================================================== */}

          <div>
            <div className="flex items-center justify-between gap-3">
              <Label required>
                Campaign Status
              </Label>

              {formData.status ===
                "Running" && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                  Counts as Running Ad ✓
                </span>
              )}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {statusOptions.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    formData.status ===
                    item.name;

                  const running =
                    item.name ===
                    "Running";

                  return (
                    <button
                      key={
                        item.name
                      }
                      type="button"
                      onClick={() =>
                        handleStatusSelect(
                          item.name
                        )
                      }
                      className={`
                        rounded-2xl
                        border
                        p-4
                        text-left
                        transition-all

                        ${
                          active &&
                          running
                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                            : active
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }
                      `}
                    >
                      <Icon
                        size={19}
                        className={
                          active &&
                          running
                            ? "text-emerald-600"
                            : active
                            ? "text-indigo-600"
                            : "text-slate-400"
                        }
                      />

                      <p
                        className={`
                          mt-3
                          text-sm
                          font-bold

                          ${
                            active &&
                            running
                              ? "text-emerald-700"
                              : active
                              ? "text-indigo-700"
                              : "text-slate-700"
                          }
                        `}
                      >
                        {
                          item.name
                        }
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {
                          item.description
                        }
                      </p>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              BUDGET + SPEND
          ================================================== */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <IndianRupee
                size={17}
                className="text-indigo-600"
              />

              <h3 className="text-sm font-bold text-slate-800">
                Budget & Spend
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                label="Campaign Budget"
                name="budget"
                value={
                  formData.budget
                }
                onChange={
                  handleChange
                }
                placeholder="10000"
                icon={
                  IndianRupee
                }
              />

              <NumberInput
                label="Amount Spent"
                name="spend"
                value={
                  formData.spend
                }
                onChange={
                  handleChange
                }
                placeholder="2500"
                icon={
                  IndianRupee
                }
              />
            </div>

            {Number(
              formData.spend
            ) >
              Number(
                formData.budget
              ) &&
              Number(
                formData.budget
              ) > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-orange-700">
                  <CircleAlert
                    size={16}
                  />

                  <p className="text-xs font-medium">
                    Spend campaign
                    budget se zyada
                    hai. Please verify
                    the values.
                  </p>
                </div>
              )}
          </div>

          {/* =================================================
              PERFORMANCE
          ================================================== */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <BarChart3
                size={17}
                className="text-indigo-600"
              />

              <h3 className="text-sm font-bold text-slate-800">
                Ad Performance
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <NumberInput
                label="Reach"
                name="reach"
                value={
                  formData.reach
                }
                onChange={
                  handleChange
                }
                placeholder="20000"
                icon={Users}
              />

              <NumberInput
                label="Impressions"
                name="impressions"
                value={
                  formData.impressions
                }
                onChange={
                  handleChange
                }
                placeholder="35000"
                icon={Eye}
              />

              <NumberInput
                label="Leads"
                name="leads"
                value={
                  formData.leads
                }
                onChange={
                  handleChange
                }
                placeholder="30"
                icon={Target}
              />
            </div>
          </div>

          {/* =================================================
              AD URL
          ================================================== */}

          <div>
            <Label>
              Meta Ad URL
            </Label>

            <div className="relative mt-2">
              <Link2
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="url"
                name="adUrl"
                value={
                  formData.adUrl
                }
                onChange={
                  handleChange
                }
                placeholder="https://..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>
          </div>

          {/* =================================================
              NOTES
          ================================================== */}

          <div>
            <Label>
              Campaign Notes
            </Label>

            <div className="relative mt-2">
              <FileText
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  text-slate-400
                "
              />

              <textarea
                name="notes"
                value={
                  formData.notes
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Audience, location, objective, client instructions, campaign result..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>
          </div>

          {/* =================================================
              INFO
          ================================================== */}

          <div
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-indigo-100
              bg-indigo-50
              p-4
            "
          >
            <CircleAlert
              size={19}
              className="mt-0.5 shrink-0 text-indigo-600"
            />

            <div>
              <p className="text-sm font-bold text-indigo-700">
                Meta Ads Tracking
              </p>

              <p className="mt-1 text-xs leading-5 text-indigo-600">
                Sirf{" "}
                <strong>
                  Running
                </strong>{" "}
                status wala campaign
                Running Ads count me
                show hoga. Spend field
                Dashboard/Client Ad
                Spend me automatically
                add hoga.
              </p>
            </div>
          </div>
        </form>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-slate-100
            bg-white
            px-5
            py-4
            sm:px-6
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            form="ad-form"
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition

              ${
                isEditMode
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            <Save size={17} />

            {isEditMode
              ? "Update Meta Ad"
              : "Save Meta Ad"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// LABEL
// ======================================================

const Label = ({
  children,
  required = false,
}) => {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {children}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
};

// ======================================================
// NUMBER INPUT
// ======================================================

const NumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => {
  return (
    <div>
      <Label>
        {label}
      </Label>

      <div className="relative mt-2">
        <Icon
          size={16}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={
            placeholder
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-50
          "
        />
      </div>
    </div>
  );
};

export default AddAdModal;