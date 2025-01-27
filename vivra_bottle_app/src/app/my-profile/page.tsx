// Fix by importing div/other components from react or matine

import { ProgressRing } from "@/components/ProgressRing/ProgressRing";

export default function MyProfile() {
  return (
    <div>
      <p>hi, how are you</p>
      <ProgressRing value={100} size={220} thickness={12}></ProgressRing>
    </div>
  );
}
