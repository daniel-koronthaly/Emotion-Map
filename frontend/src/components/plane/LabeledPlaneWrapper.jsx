/**
 * LabeledPlaneWrapper
 *
 * Props:
 * - width / height (number) -- size of SVG plane in px (square assumed)
 * - children -- the SVG plane (or CartesianPlane component)
 * - xLabelTop, xLabelBottom, yLabelLeft, yLabelRight -- optional label strings
 * - labelSpacing (number) -- distance in px from the plane border to labels (default 12)
 * - className / labelClassName for styling
 *
 * Important: The wrapper keeps the SVG exactly width x height.
 * Labels are rendered as HTML elements placed outside the SVG using absolute positioning.
 */
export default function LabeledPlaneWrapper({
  width = 400,
  height = 400, // keep symmetric if you want square; still supported
  children,
  xLabelMin = "Negative",
  xLabelMax = "Positive",
  xLabelBottom = "Valence",
  xLabelTop = null,
  yLabelMin = "Weak",
  yLabelMax = "Strong",
  yLabelLeft = "Arousal",
  yLabelRight = null,
  labelSpacing = 12,
  className = "",
  labelClassName = "",
}) {
  // Inline styles using computed spacing so the labels move with width/height automatically
  return (
    <div
      className={`labeled-plane-root ${className}`}
      style={{
        display: "inline-block",
        width: "100%",
        padding: "20px"
      }}
    >
      {/* position:relative inline-block container that is exactly the SVG size */}
      <div
        className="labeled-plane-container"
        style={{
          display: "inline-block",
          position: "relative",
          width,
          height,
        }}
      >
        {/* The plane itself (SVG). Expect children to be an SVG sized exactly width x height */}
        <div style={{ width, height }}>{children}</div>

        {/* Top X label (above the plane) */}
        {xLabelTop ? (
          <div
            className={`axis-label axis-label-x-top ${labelClassName}`}
            style={{
              position: "absolute",
              left: "50%",
              top: -labelSpacing - 16,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {xLabelTop}
          </div>
        ) : null}

        {/* X-axis labels */}
        {xLabelBottom || xLabelMin || xLabelMax ? (
          <>
            {/* Center label */}
            {xLabelBottom && (
              <div
                className={`axis-label axis-label-x-center ${labelClassName}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  marginTop: labelSpacing,
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {xLabelBottom}
              </div>
            )}

            {/* Min label */}
            {xLabelMin && (
              <div
                className={`axis-label axis-label-x-min ${labelClassName}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "100%",
                  marginTop: labelSpacing,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {xLabelMin}
              </div>
            )}

            {/* Max label */}
            {xLabelMax && (
              <div
                className={`axis-label axis-label-x-max ${labelClassName}`}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: labelSpacing,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textAlign: "right",
                }}
              >
                {xLabelMax}
              </div>
            )}
          </>
        ) : null}

        <div
          style={{
            position: "absolute",
            left: -labelSpacing - 30,
            top: 0,
            height: height,
            width: 50,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", marginTop: 12 }}>
            {yLabelMax}
          </div>

          <div style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}>
            {yLabelLeft}
          </div>

          <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", marginBottom: 6 }}>
            {yLabelMin}
          </div>
        </div>


        {/* Right Y label (to the right of the plane) */}
        {yLabelRight ? (
          <div
            className={`axis-label axis-label-y-right ${labelClassName}`}
            style={{
              position: "absolute",
              left: "100%",
              marginLeft: labelSpacing - 16,
              top: "50%",
              transform: "translateY(-50%) rotate(90deg)",
              transformOrigin: "center",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {yLabelRight}
          </div>
        ) : null}
      </div>
    </div>
  );
}
