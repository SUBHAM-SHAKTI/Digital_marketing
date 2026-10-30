import React, { useEffect, useState } from "react";

import {
  X,
  CalendarDays,
  Film,
  FileText,
  Save,
  CheckCircle2,
  Image,
  Layers3,
  CircleAlert,
  Clock3,
  Edit3,
  PlusCircle,
  Pencil,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

// ======================================================
// INITIAL FORM
// New Reel/Post default = Posted
// ======================================================

const initialFormData = {
  date: "",
  type: "Reel",

  // IMPORTANT:
  // New content will be Posted by default.
  status: "Posted",

  title: "",

  instagram: true,
  facebook: false,

  instagramUrl: "",
  facebookUrl: "",

  notes: "",
};

// ======================================================
// ADD / EDIT WORK MODAL
// ======================================================

const AddWorkModal = ({
  isOpen,
  onClose,
  onSave,

  selectedMonth = "September 2026",
  clientName = "Client",

  editingWork = null,
}) => {
  const [formData, setFormData] =
    useState(initialFormData);

  const [error, setError] =
    useState("");

  const isEditMode =
    Boolean(editingWork);

  // ====================================================
  // LOAD ADD / EDIT DATA
  // ====================================================

  useEffect(() => {
    if (!isOpen) return;

    setError("");

    // ==================================================
    // EDIT MODE
    // Existing status stays exactly as saved.
    // ==================================================

    if (editingWork) {
      setFormData({
        date:
          editingWork.date || "",

        type:
          editingWork.type ||
          "Reel",

        status:
          editingWork.status ||
          "Posted",

        title:
          editingWork.title || "",

        instagram:
          Boolean(
            editingWork.instagram ||
              editingWork.instagramUrl
          ),

        facebook:
          Boolean(
            editingWork.facebook ||
              editingWork.facebookUrl
          ),

        instagramUrl:
          editingWork.instagramUrl ||
          "",

        facebookUrl:
          editingWork.facebookUrl ||
          "",

        notes:
          editingWork.notes || "",
      });

      return;
    }

    // ==================================================
    // ADD MODE
    // Default status = Posted
    // ==================================================

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setFormData({
      ...initialFormData,

      date: today,

      type: "Reel",

      status: "Posted",

      instagram: true,

      facebook: false,
    });
  }, [isOpen, editingWork]);

  // ====================================================
  // ESCAPE + BODY SCROLL
  // ====================================================

  useEffect(() => {
    if (!isOpen) return;

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

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        oldOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // ====================================================
  // INPUT CHANGE
  // ====================================================

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setError("");

    setFormData(
      (previous) => ({
        ...previous,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  // ====================================================
  // CONTENT TYPE
  // ====================================================

  const handleTypeSelect = (
    type
  ) => {
    setError("");

    setFormData(
      (previous) => ({
        ...previous,
        type,
      })
    );
  };

  // ====================================================
  // STATUS
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
  // PLATFORM
  // ====================================================

  const togglePlatform = (
    platform
  ) => {
    setError("");

    setFormData(
      (previous) => {
        if (
          platform ===
          "instagram"
        ) {
          const newValue =
            !previous.instagram;

          return {
            ...previous,

            instagram:
              newValue,

            instagramUrl:
              newValue
                ? previous.instagramUrl
                : "",
          };
        }

        const newValue =
          !previous.facebook;

        return {
          ...previous,

          facebook:
            newValue,

          facebookUrl:
            newValue
              ? previous.facebookUrl
              : "",
        };
      }
    );
  };

  // ====================================================
  // URL VALIDATION
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
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!formData.date) {
      setError(
        "Please select the work date."
      );

      return;
    }

    if (!formData.type) {
      setError(
        "Please select content type."
      );

      return;
    }

    if (!formData.status) {
      setError(
        "Please select content status."
      );

      return;
    }

    if (
      !formData.instagram &&
      !formData.facebook
    ) {
      setError(
        "Please select Instagram or Facebook."
      );

      return;
    }

    if (
      formData.instagram &&
      formData.instagramUrl &&
      !isValidUrl(
        formData.instagramUrl
      )
    ) {
      setError(
        "Please enter a valid Instagram URL starting with http:// or https://"
      );

      return;
    }

    if (
      formData.facebook &&
      formData.facebookUrl &&
      !isValidUrl(
        formData.facebookUrl
      )
    ) {
      setError(
        "Please enter a valid Facebook URL starting with http:// or https://"
      );

      return;
    }

    // ==================================================
    // FINAL CONTENT OBJECT
    // ==================================================

    const workData = {
      id:
        editingWork?.id ??
        (typeof crypto !==
          "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now()),

      month:
        editingWork?.month ||
        selectedMonth,

      date:
        formData.date,

      type:
        formData.type,

      status:
        formData.status,

      title:
        formData.title.trim() ||
        "Untitled Content",

      instagram:
        Boolean(
          formData.instagram
        ),

      facebook:
        Boolean(
          formData.facebook
        ),

      instagramUrl:
        formData.instagram
          ? formData.instagramUrl.trim()
          : "",

      facebookUrl:
        formData.facebook
          ? formData.facebookUrl.trim()
          : "",

      notes:
        formData.notes.trim(),

      createdAt:
        editingWork?.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    if (
      typeof onSave ===
      "function"
    ) {
      onSave(workData);
    }
  };

  // ====================================================
  // TYPES
  // ====================================================

  const contentTypes = [
    {
      name: "Reel",
      icon: Film,
      description:
        "Short-form video",
    },

    {
      name: "Post",
      icon: Image,
      description:
        "Single image post",
    },

    {
      name: "Carousel",
      icon: Layers3,
      description:
        "Multiple slides",
    },

    {
      name: "Story",
      icon: FileText,
      description:
        "Story content",
    },
  ];

  // ====================================================
  // STATUS OPTIONS
  // ====================================================

  const statusOptions = [
    {
      name: "Created",
      icon: PlusCircle,
    },

    {
      name: "Editing",
      icon: Edit3,
    },

    {
      name: "Ready",
      icon: CheckCircle2,
    },

    {
      name: "Scheduled",
      icon: Clock3,
    },

    {
      name: "Posted",
      icon: CheckCircle2,
    },
  ];

  // ====================================================
  // DOES THIS COUNT?
  // ====================================================

  const countsInTarget =
    formData.status ===
      "Posted" &&
    (formData.type ===
      "Reel" ||
      formData.type ===
        "Post");

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
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* =============================================
            HEADER
        ============================================== */}

        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
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
                <PlusCircle
                  size={21}
                />
              )}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {clientName}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {isEditMode
                  ? "Edit Content"
                  : "Add Content"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {selectedMonth}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* =============================================
            FORM
        ============================================== */}

        <form
          id="work-form"
          onSubmit={
            handleSubmit
          }
          className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6"
        >
          {/* ERROR */}

          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <CircleAlert
                size={19}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {/* ===========================================
              DEFAULT POSTED MESSAGE
          ============================================ */}

          {!isEditMode && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-sm font-bold text-emerald-700">
                  Posted selected
                  by default
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-600">
                  Agar ye Reel/Post
                  already publish ho
                  chuka hai to simply
                  save karo. Agar abhi
                  publish nahi hua hai,
                  status Created,
                  Editing, Ready ya
                  Scheduled select
                  karo.
                </p>
              </div>
            </div>
          )}

          {/* ===========================================
              DATE
          ============================================ */}

          <div>
            <Label required>
              Work Date
            </Label>

            <div className="relative mt-2">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="date"
                value={
                  formData.date
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* ===========================================
              CONTENT TYPE
          ============================================ */}

          <div>
            <Label required>
              Content Type
            </Label>

            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {contentTypes.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    formData.type ===
                    item.name;

                  return (
                    <button
                      key={
                        item.name
                      }
                      type="button"
                      onClick={() =>
                        handleTypeSelect(
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
                            : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
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
                        className={`mt-3 text-sm font-bold ${
                          active
                            ? "text-indigo-700"
                            : "text-slate-700"
                        }`}
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

            {(formData.type ===
              "Story" ||
              formData.type ===
                "Carousel") && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-orange-100 bg-orange-50 p-3">
                <CircleAlert
                  size={16}
                  className="mt-0.5 shrink-0 text-orange-600"
                />

                <p className="text-xs leading-5 text-orange-700">
                  Story aur
                  Carousel save
                  honge, lekin
                  monthly 22
                  content target
                  me count nahi
                  honge.
                </p>
              </div>
            )}
          </div>

          {/* ===========================================
              TITLE
          ============================================ */}

          <div>
            <Label>
              Content Title
            </Label>

            <div className="relative mt-2">
              <FileText
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="Example: New product launch reel"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* ===========================================
              STATUS
          ============================================ */}

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label required>
                Work Status
              </Label>

              {countsInTarget ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                  Counts in 22
                  Target ✓
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                  Not counted in
                  target
                </span>
              )}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {statusOptions.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    formData.status ===
                    item.name;

                  const posted =
                    item.name ===
                    "Posted";

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
                        rounded-xl
                        border
                        px-3
                        py-3
                        text-center
                        transition

                        ${
                          active &&
                          posted
                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                            : active
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }
                      `}
                    >
                      <Icon
                        size={17}
                        className={`mx-auto ${
                          active &&
                          posted
                            ? "text-emerald-600"
                            : active
                            ? "text-indigo-600"
                            : "text-slate-400"
                        }`}
                      />

                      <p
                        className={`mt-2 text-[11px] font-bold ${
                          active &&
                          posted
                            ? "text-emerald-700"
                            : active
                            ? "text-indigo-700"
                            : "text-slate-600"
                        }`}
                      >
                        {
                          item.name
                        }
                      </p>
                    </button>
                  );
                }
              )}
            </div>

            {/* COUNTS MESSAGE */}

            {countsInTarget && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-xs leading-5 text-emerald-700">
                  Ye{" "}
                  <strong>
                    Posted{" "}
                    {
                      formData.type
                    }
                  </strong>{" "}
                  hai. Save karte
                  hi Monthly
                  Content Target
                  aur Content
                  Posted me{" "}
                  <strong>
                    +1
                  </strong>{" "}
                  hoga.
                  {formData.type ===
                    "Reel" &&
                    " Reels Posted me bhi +1 hoga."}
                </p>
              </div>
            )}
          </div>

          {/* ===========================================
              PLATFORM
          ============================================ */}

          <div>
            <Label required>
              Platforms
            </Label>

            <p className="mt-1 text-xs text-slate-400">
              Content jis
              platform par post
              hua hai use select
              karo.
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {/* INSTAGRAM */}

              <button
                type="button"
                onClick={() =>
                  togglePlatform(
                    "instagram"
                  )
                }
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition-all

                  ${
                    formData.instagram
                      ? "border-pink-300 bg-pink-50 ring-2 ring-pink-100"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      formData.instagram
                        ? "bg-pink-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FaInstagram
                      size={19}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Instagram
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {
                        formData.instagram
                          ? "Selected"
                          : "Not selected"
                      }
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    formData.instagram
                      ? "border-pink-600 bg-pink-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {formData.instagram && (
                    <CheckCircle2
                      size={14}
                    />
                  )}
                </div>
              </button>

              {/* FACEBOOK */}

              <button
                type="button"
                onClick={() =>
                  togglePlatform(
                    "facebook"
                  )
                }
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition-all

                  ${
                    formData.facebook
                      ? "border-blue-300 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      formData.facebook
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FaFacebookF
                      size={16}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Facebook
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {
                        formData.facebook
                          ? "Selected"
                          : "Not selected"
                      }
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    formData.facebook
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {formData.facebook && (
                    <CheckCircle2
                      size={14}
                    />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* ===========================================
              INSTAGRAM URL
          ============================================ */}

          {formData.instagram && (
            <div>
              <Label>
                Instagram Post URL
              </Label>

              <div className="relative mt-2">
                <FaInstagram
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                />

                <input
                  type="url"
                  name="instagramUrl"
                  value={
                    formData.instagramUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://www.instagram.com/..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
                />
              </div>
            </div>
          )}

          {/* ===========================================
              FACEBOOK URL
          ============================================ */}

          {formData.facebook && (
            <div>
              <Label>
                Facebook Post URL
              </Label>

              <div className="relative mt-2">
                <FaFacebookF
                  size={15}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                />

                <input
                  type="url"
                  name="facebookUrl"
                  value={
                    formData.facebookUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://www.facebook.com/..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>
          )}

          {/* ===========================================
              NOTES
          ============================================ */}

          <div>
            <Label>
              Notes
            </Label>

            <div className="relative mt-2">
              <FileText
                size={17}
                className="pointer-events-none absolute left-4 top-4 text-slate-400"
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
                placeholder="Caption, design instructions, client feedback, etc..."
                className="w-full resize-none rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          {/* ===========================================
              RULE
          ============================================ */}

          <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
            <CircleAlert
              size={19}
              className="mt-0.5 shrink-0 text-indigo-600"
            />

            <div>
              <p className="text-sm font-bold text-indigo-700">
                Monthly Target
                Rule
              </p>

              <p className="mt-1 text-xs leading-5 text-indigo-600">
                <strong>
                  Posted Reel
                </strong>{" "}
                aur{" "}
                <strong>
                  Posted Post
                </strong>{" "}
                hi 22 monthly
                content target me
                count honge.
                Story, Carousel,
                Created, Editing,
                Ready aur
                Scheduled target
                me count nahi
                honge.
              </p>
            </div>
          </div>
        </form>

        {/* =============================================
            FOOTER
        ============================================== */}

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="work-form"
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
              ? "Update Content"
              : "Save Content"}
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

export default AddWorkModal;