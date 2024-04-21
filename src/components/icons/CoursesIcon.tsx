export function CoursesIcon({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="7.84" rx="2.68426" fill={color} />
      <rect y="20.16" width="28" height="7.84" rx="2.68426" fill={color} />
      <rect y="10.08" width="28" height="7.84" rx="2.68426" fill={color} />
    </svg>
  );
}
