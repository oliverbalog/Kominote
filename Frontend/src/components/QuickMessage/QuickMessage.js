import React from "react";

export const QuickMessage = () => {
  function handleSubmit(e) {
    console.log("Sent");
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" maxLength="40" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
