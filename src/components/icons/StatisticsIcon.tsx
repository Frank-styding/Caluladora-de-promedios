export function StatisticsIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="22"
      viewBox="0 0 40 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="4.29036"
        cy="16.233"
        rx="4.29036"
        ry="4.89352"
        fill={color}
      />
      <ellipse
        cx="15.6524"
        cy="9.21331"
        rx="4.29036"
        ry="4.89352"
        fill={color}
      />
      <ellipse
        cx="27.4879"
        cy="15.693"
        rx="4.29036"
        ry="4.89352"
        fill={color}
      />
      <ellipse
        cx="35.0626"
        cy="4.89352"
        rx="4.29036"
        ry="4.89352"
        fill={color}
      />
      <path
        d="M4.29036 16.0642L15.4453 9.21331L27.4583 16.0642L35.1809 4.31979"
        stroke={color}
        strokeWidth="1.95741"
      />
    </svg>
  );
}
