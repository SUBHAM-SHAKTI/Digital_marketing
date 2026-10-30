import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

const StatCard = ({
  title = "Total Clients",
  value = 0,
  subtitle = "",
  icon: Icon,
  progress,
  target,
  trend,
  trendType = "up",
}) => {
  // ======================================================
  // CALCULATE PROGRESS
  // ======================================================

  let calculatedProgress = 0;

  if (
    progress !== undefined &&
    progress !== null
  ) {
    calculatedProgress = Number(progress);
  } else if (
    target !== undefined &&
    target !== null &&
    Number(target) > 0
  ) {
    calculatedProgress =
      (Number(value) / Number(target)) * 100;
  }

  calculatedProgress = Math.min(
    Math.max(calculatedProgress, 0),
    100
  );

  // ======================================================
  // TREND SETTINGS
  // ======================================================

  const getTrendSettings = () => {
    if (trendType === "down") {
      return {
        icon: ArrowDownRight,
        textClass: "text-red-600",
        bgClass: "bg-red-50",
      };
    }

    if (trendType === "neutral") {
      return {
        icon: Minus,
        textClass: "text-slate-600",
        bgClass: "bg-slate-100",
      };
    }

    return {
      icon: ArrowUpRight,
      textClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    };
  };

  const trendSettings = getTrendSettings();
  const TrendIcon = trendSettings.icon;

  // ======================================================
  // FORMAT LARGE NUMBERS
  // ======================================================

  const formatValue = (inputValue) => {
    if (
      typeof inputValue !== "number"
    ) {
      return inputValue;
    }

    return new Intl.NumberFormat(
      "en-IN"
    ).format(inputValue);
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-lg
      "
    >
      {/* Background Decoration */}

      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-indigo-50
          opacity-60
          transition
          duration-300
          group-hover:scale-125
        "
      />

      {/* ================================================
          HEADER
      ================================================= */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <p
            className="
              truncate
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            {title}
          </p>

          <div
            className="
              mt-2
              flex
              items-end
              gap-2
            "
          >
            <h3
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {formatValue(value)}
            </h3>

            {target !== undefined &&
              target !== null && (
                <span
                  className="
                    mb-1
                    text-sm
                    font-semibold
                    text-slate-400
                  "
                >
                  / {formatValue(target)}
                </span>
              )}
          </div>

          {subtitle && (
            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* ICON */}

        {Icon && (
          <div
            className="
              relative
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
            <Icon
              size={23}
              strokeWidth={2.1}
            />
          </div>
        )}
      </div>

      {/* ================================================
          PROGRESS BAR
      ================================================= */}

      {(progress !== undefined ||
        target !== undefined) && (
        <div className="relative mt-5">
          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[11px]
                font-medium
                text-slate-400
              "
            >
              Progress
            </span>

            <span
              className="
                text-xs
                font-bold
                text-indigo-600
              "
            >
              {Math.round(
                calculatedProgress
              )}
              %
            </span>
          </div>

          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-slate-100
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-indigo-600
                transition-all
                duration-700
              "
              style={{
                width: `${calculatedProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* ================================================
          TREND
      ================================================= */}

      {trend !== undefined &&
        trend !== null && (
          <div
            className="
              relative
              mt-4
              flex
              items-center
              gap-2
            "
          >
            <div
              className={`
                flex
                items-center
                gap-1
                rounded-lg
                px-2
                py-1

                ${trendSettings.bgClass}
                ${trendSettings.textClass}
              `}
            >
              <TrendIcon size={14} />

              <span
                className="
                  text-xs
                  font-bold
                "
              >
                {trend}
              </span>
            </div>

            <span
              className="
                text-[11px]
                text-slate-400
              "
            >
              this month
            </span>
          </div>
        )}
    </div>
  );
};

export default StatCard;