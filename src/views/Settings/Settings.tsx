import { Theme } from "../../theme";

export function Settings() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        width: "100vw",
        height: "100%",
        fontSize: "30px",
        fontFamily: Theme.fontFamily,
        color: Theme.textColor,
      }}
    >
      En desarrolo
    </div>
  );
}
