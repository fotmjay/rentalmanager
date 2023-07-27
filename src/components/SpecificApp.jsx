import { useState } from "react";

export default function SpecificApp(props) {
  const [appData, setAppData] = useState("");
  return (
    <div className="specificApp--container">
      <h1 className="specificApp--title">Information about appartement X</h1>
      <p className="specificApp--paragraph">
        More info about appart X, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aspernatur ducimus
        et blanditiis tenetur iusto consectetur earum recusandae? Eius debitis eaque ab nam adipisci. Soluta quaerat in
        quasi debitis vero!
      </p>
    </div>
  );
}
