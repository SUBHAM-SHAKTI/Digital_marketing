import React from "react";

import {
  Folder,
  Film,
  FileImage,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  PlayCircle,
  Clock3,
  Edit3,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

// ======================================================
// CLIENT CARD
// ======================================================

const ClientCard = ({
  client,
  selectedMonth = "September 2026",
  onOpen,
}) => {
  // ====================================================
  // SAFE CLIENT DATA
  // ====================================================

  const target = Number(client?.monthlyTarget) || 22;

  const works = client?.works || [];
  const ads = client?.ads || [];

  // ====================================================
  // SELECTED MONTH WORK
  // ====================================================

  const monthWorks = works.filter(
    (work) => work.month === selectedMonth
  );

  // ====================================================
  // POSTED REEL + POST
  //
  // Only these count toward monthly target.
  // Story / Carousel do NOT count.
  // ====================================================

  const postedWorks = monthWorks.filter(
    (work) =>
      work.status === "Posted" &&
      (work.type === "Reel" || work.type === "Post")
  );

  // ====================================================
  // CONTENT COUNTS
  // ====================================================

  const reelCount = postedWorks.filter(
    (work) => work.type === "Reel"
  ).length;

  const postCount = postedWorks.filter(
    (work) => work.type === "Post"
  ).length;

  const totalContent = reelCount + postCount;

  // ====================================================
  // REMAINING / EXTRA
  // ====================================================

  const remainingContent = Math.max(
    target - totalContent,
    0
  );

  const extraContent = Math.max(
    totalContent - target,
    0
  );

  // ====================================================
  // PROGRESS
  // ====================================================

  const progress =
    target > 0
      ? Math.min((totalContent / target) * 100, 100)
      : 0;

  // ====================================================
  // TOTAL CREATED CONTENT
  // Reel + Post only
  // ====================================================

  const createdContent = monthWorks.filter(
    (work) =>
      work.type === "Reel" || work.type === "Post"
  ).length;

  // ====================================================
  // EDITING
  // ====================================================

  const editingContent = monthWorks.filter(
    (work) =>
      work.status === "Editing" &&
      (work.type === "Reel" || work.type === "Post")
  ).length;

  // ====================================================
  // READY
  // ====================================================

  const readyContent = monthWorks.filter(
    (work) =>
      work.status === "Ready" &&
      (work.type === "Reel" || work.type === "Post")
  ).length;

  // ====================================================
  // SCHEDULED
  // ====================================================

  const scheduledContent = monthWorks.filter(
    (work) =>
      work.status === "Scheduled" &&
      (work.type === "Reel" || work.type === "Post")
  ).length;

  // ====================================================
  // INSTAGRAM PUBLISHED
  // ====================================================

  const instagramCount = postedWorks.filter(
    (work) =>
      work.instagram === true ||
      Boolean(work.instagramUrl)
  ).length;

  // ====================================================
  // FACEBOOK PUBLISHED
  // ====================================================

  const facebookCount = postedWorks.filter(
    (work) =>
      work.facebook === true ||
      Boolean(work.facebookUrl)
  ).length;

  // ====================================================
  // SELECTED MONTH ADS
  // ====================================================

  const monthAds = ads.filter(
    (ad) => ad.month === selectedMonth
  );

  const totalAds = monthAds.length;

  // ====================================================
  // RUNNING ADS
  // ====================================================

  const runningAds = monthAds.filter(
    (ad) => ad.status === "Running"
  ).length;

  // ====================================================
  // SCHEDULED ADS
  // ====================================================

  const scheduledAds = monthAds.filter(
    (ad) => ad.status === "Scheduled"
  ).length;

  // ====================================================
  // ENDED ADS
  // ====================================================

  const endedAds = monthAds.filter(
    (ad) => ad.status === "Ended"
  ).length;

  // ====================================================
  // TOTAL AD BUDGET
  // ====================================================

  const totalAdBudget = monthAds.reduce(
    (total, ad) => total + (Number(ad.budget) || 0),
    0
  );

  // ====================================================
  // TOTAL AD SPEND
  // ====================================================

  const totalAdSpend = monthAds.reduce(
    (total, ad) => total + (Number(ad.spend) || 0),
    0
  );

  // ====================================================
  // FORMAT MONEY
  // ====================================================

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ====================================================
  // WORK STATUS
  // ====================================================

  const getWorkStatus = () => {
    // Target completed

    if (totalContent >= target) {
      return {
        title: "Target Completed",
        message:
          extraContent > 0
            ? `${extraContent} extra content posted`
            : "Monthly content target completed",
        textClass: "text-emerald-700",
        bgClass: "bg-emerald-50",
        borderClass: "border-emerald-200",
        progressClass: "bg-emerald-500",
        iconClass: "text-emerald-600",
        Icon: CheckCircle2,
      };
    }

    // 1 - 4 remaining

    if (remainingContent <= 4) {
      return {
        title: "Almost Complete",
        message: `${remainingContent} content remaining`,
        textClass: "text-amber-700",
        bgClass: "bg-amber-50",
        borderClass: "border-amber-200",
        progressClass: "bg-amber-500",
        iconClass: "text-amber-600",
        Icon: AlertTriangle,
      };
    }

    // 5 - 8 remaining

    if (remainingContent <= 8) {
      return {
        title: "Needs Attention",
        message: `${remainingContent} content remaining`,
        textClass: "text-orange-700",
        bgClass: "bg-orange-50",
        borderClass: "border-orange-200",
        progressClass: "bg-orange-500",
        iconClass: "text-orange-600",
        Icon: AlertTriangle,
      };
    }

    // More than 8 remaining

    return {
      title: "Behind Target",
      message: `${remainingContent} content remaining`,
      textClass: "text-red-700",
      bgClass: "bg-red-50",
      borderClass: "border-red-200",
      progressClass: "bg-red-500",
      iconClass: "text-red-600",
      Icon: AlertTriangle,
    };
  };

  const workStatus = getWorkStatus();

  const WorkStatusIcon = workStatus.Icon;

  // ====================================================
  // OPEN CLIENT
  // ====================================================

  const handleOpenClient = () => {
    if (onOpen) {
      onOpen(client);
    }
  };

  // ====================================================
  // UI
  // ====================================================

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-xl
      "
    >
      {/* =================================================
          TOP DECORATION
      ================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-purple-500
        "
      />

      {/* =================================================
          CARD BODY
      ================================================== */}

      <div className="p-5">
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between gap-4">
          {/* CLIENT */}

          <div className="flex min-w-0 items-center gap-3">
            {/* FOLDER */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-600
                transition
                duration-300
                group-hover:bg-indigo-600
                group-hover:text-white
              "
            >
              <Folder size={24} />
            </div>

            {/* NAME */}

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-base
                  font-bold
                  text-slate-900
                "
              >
                {client?.name || "Unnamed Client"}
              </h3>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                {selectedMonth}
              </p>
            </div>
          </div>

          {/* RUNNING ADS */}

          {runningAds > 0 && (
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                bg-emerald-50
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                text-emerald-700
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />

              {runningAds} Running
            </div>
          )}
        </div>

        {/* =================================================
            SOCIAL ACCOUNT NAMES
        ================================================== */}

        {(client?.instagram || client?.facebook) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {/* INSTAGRAM */}

            {client?.instagram && (
              <div
                className="
                  flex
                  max-w-full
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-pink-50
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-medium
                  text-pink-700
                "
              >
                <FaInstagram
                  size={13}
                  className="shrink-0"
                />

                <span className="truncate">
                  {client.instagram}
                </span>
              </div>
            )}

            {/* FACEBOOK */}

            {client?.facebook && (
              <div
                className="
                  flex
                  max-w-full
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-blue-50
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-medium
                  text-blue-700
                "
              >
                <FaFacebookF
                  size={12}
                  className="shrink-0"
                />

                <span className="truncate">
                  {client.facebook}
                </span>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            MONTHLY TARGET
        ================================================== */}

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-slate-100
            bg-slate-50/70
            p-4
          "
        >
          {/* TARGET HEADER */}

          <div className="flex items-end justify-between gap-4">
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
                Monthly Content
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span
                  className="
                    text-3xl
                    font-bold
                    text-slate-900
                  "
                >
                  {totalContent}
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-slate-400
                  "
                >
                  / {target}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`
                  text-lg
                  font-bold
                  ${workStatus.textClass}
                `}
              >
                {Math.round(progress)}%
              </p>

              <p className="text-[9px] text-slate-400">
                completed
              </p>
            </div>
          </div>

          {/* PROGRESS */}

          <div
            className="
              mt-3
              h-2.5
              overflow-hidden
              rounded-full
              bg-slate-200
            "
          >
            <div
              className={`
                h-full
                rounded-full
                transition-all
                duration-700
                ${workStatus.progressClass}
              `}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* REMAINING */}

          <div className="mt-2 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">
              {totalContent} posted
            </span>

            {remainingContent > 0 ? (
              <span className="font-bold text-slate-600">
                {remainingContent} remaining
              </span>
            ) : (
              <span className="font-bold text-emerald-600">
                Complete
                {extraContent > 0
                  ? ` +${extraContent}`
                  : ""}
              </span>
            )}
          </div>
        </div>

        {/* =================================================
            REEL / POST / ADS
        ================================================== */}

        <div className="mt-4 grid grid-cols-3 gap-2">
          {/* REELS */}

          <div
            className="
              rounded-xl
              border
              border-slate-100
              bg-white
              p-3
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-purple-50
                text-purple-600
              "
            >
              <Film size={16} />
            </div>

            <p
              className="
                mt-2
                text-lg
                font-bold
                text-slate-900
              "
            >
              {reelCount}
            </p>

            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Reels
            </p>
          </div>

          {/* POSTS */}

          <div
            className="
              rounded-xl
              border
              border-slate-100
              bg-white
              p-3
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-blue-50
                text-blue-600
              "
            >
              <FileImage size={16} />
            </div>

            <p
              className="
                mt-2
                text-lg
                font-bold
                text-slate-900
              "
            >
              {postCount}
            </p>

            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Posts
            </p>
          </div>

          {/* META ADS */}

          <div
            className="
              rounded-xl
              border
              border-slate-100
              bg-white
              p-3
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-orange-50
                text-orange-600
              "
            >
              <Megaphone size={16} />
            </div>

            <p
              className="
                mt-2
                text-lg
                font-bold
                text-slate-900
              "
            >
              {totalAds}
            </p>

            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Meta Ads
            </p>
          </div>
        </div>

        {/* =================================================
            SOCIAL PUBLISHING
        ================================================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-2
          "
        >
          {/* INSTAGRAM */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-pink-50
              px-3
              py-2.5
            "
          >
            <div className="flex items-center gap-2">
              <FaInstagram
                size={16}
                className="text-pink-600"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-pink-700
                "
              >
                Instagram
              </span>
            </div>

            <span
              className="
                text-sm
                font-bold
                text-pink-700
              "
            >
              {instagramCount}
            </span>
          </div>

          {/* FACEBOOK */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-blue-50
              px-3
              py-2.5
            "
          >
            <div className="flex items-center gap-2">
              <FaFacebookF
                size={14}
                className="text-blue-600"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-blue-700
                "
              >
                Facebook
              </span>
            </div>

            <span
              className="
                text-sm
                font-bold
                text-blue-700
              "
            >
              {facebookCount}
            </span>
          </div>
        </div>

        {/* =================================================
            CONTENT PRODUCTION
        ================================================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-4
            divide-x
            divide-slate-100
            rounded-xl
            border
            border-slate-100
            bg-white
            py-3
          "
        >
          {/* CREATED */}

          <div className="text-center">
            <p className="text-sm font-bold text-slate-800">
              {createdContent}
            </p>

            <p className="mt-0.5 text-[8px] uppercase text-slate-400">
              Created
            </p>
          </div>

          {/* EDITING */}

          <div className="text-center">
            <p className="text-sm font-bold text-orange-600">
              {editingContent}
            </p>

            <p className="mt-0.5 text-[8px] uppercase text-slate-400">
              Editing
            </p>
          </div>

          {/* READY */}

          <div className="text-center">
            <p className="text-sm font-bold text-blue-600">
              {readyContent}
            </p>

            <p className="mt-0.5 text-[8px] uppercase text-slate-400">
              Ready
            </p>
          </div>

          {/* SCHEDULED */}

          <div className="text-center">
            <p className="text-sm font-bold text-purple-600">
              {scheduledContent}
            </p>

            <p className="mt-0.5 text-[8px] uppercase text-slate-400">
              Scheduled
            </p>
          </div>
        </div>

        {/* =================================================
            WORK ALERT
        ================================================== */}

        <div
          className={`
            mt-4
            flex
            items-center
            gap-3
            rounded-xl
            border
            p-3

            ${workStatus.bgClass}
            ${workStatus.borderClass}
          `}
        >
          <WorkStatusIcon
            size={18}
            className={`
              shrink-0
              ${workStatus.iconClass}
            `}
          />

          <div className="min-w-0">
            <p
              className={`
                text-xs
                font-bold
                ${workStatus.textClass}
              `}
            >
              {workStatus.title}
            </p>

            <p
              className={`
                mt-0.5
                text-[10px]
                ${workStatus.textClass}
              `}
            >
              {workStatus.message}
            </p>
          </div>
        </div>

        {/* =================================================
            META ADS DETAILS
        ================================================== */}

        {totalAds > 0 && (
          <div
            className="
              mt-4
              rounded-xl
              border
              border-slate-100
              bg-slate-50
              p-3
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone
                  size={15}
                  className="text-orange-500"
                />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Meta Ads
                </p>
              </div>

              <p
                className="
                  text-xs
                  font-bold
                  text-slate-800
                "
              >
                {totalAds} Campaign
                {totalAds !== 1 ? "s" : ""}
              </p>
            </div>

            {/* ADS INFO */}

            <div
              className="
                mt-3
                grid
                grid-cols-3
                gap-2
              "
            >
              {/* RUNNING */}

              <div>
                <div className="flex items-center gap-1">
                  <PlayCircle
                    size={12}
                    className="text-emerald-600"
                  />

                  <p className="text-[9px] text-slate-400">
                    Running
                  </p>
                </div>

                <p className="mt-1 text-sm font-bold text-emerald-600">
                  {runningAds}
                </p>
              </div>

              {/* ENDED */}

              <div>
                <div className="flex items-center gap-1">
                  <CheckCircle2
                    size={12}
                    className="text-slate-500"
                  />

                  <p className="text-[9px] text-slate-400">
                    Ended
                  </p>
                </div>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  {endedAds}
                </p>
              </div>

              {/* SCHEDULED */}

              <div>
                <div className="flex items-center gap-1">
                  <Clock3
                    size={12}
                    className="text-purple-600"
                  />

                  <p className="text-[9px] text-slate-400">
                    Scheduled
                  </p>
                </div>

                <p className="mt-1 text-sm font-bold text-purple-600">
                  {scheduledAds}
                </p>
              </div>
            </div>

            {/* BUDGET */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                border-t
                border-slate-200
                pt-3
              "
            >
              <div className="flex items-center gap-1.5">
                <IndianRupee
                  size={13}
                  className="text-slate-400"
                />

                <span className="text-[10px] text-slate-500">
                  Budget
                </span>
              </div>

              <span className="text-xs font-bold text-slate-800">
                {formatMoney(totalAdBudget)}
              </span>
            </div>

            {/* SPEND */}

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Actual Spend
              </span>

              <span className="text-xs font-bold text-orange-600">
                {formatMoney(totalAdSpend)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          OPEN FOLDER BUTTON
      ================================================== */}

      <div
        className="
          border-t
          border-slate-100
          bg-slate-50/50
          p-4
        "
      >
        <button
          type="button"
          onClick={handleOpenClient}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-indigo-700
            active:scale-[0.98]
          "
        >
          <Folder size={17} />

          Open Client Folder

          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
