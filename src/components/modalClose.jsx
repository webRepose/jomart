import { useEffect } from "react";

const ModalClose = ({ modal, setModal, refButton, refModal, refButton2 }) => {
  // Close the modal when the Escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal === true) {
      setModal((prev) => (prev = false));
    }
  });

  useEffect(() => {
    // Close the modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (
        refModal.current &&
        !refModal.current.contains(event.target) &&
        refButton &&
        !refButton.current.contains(event.target) &&
        refButton2 &&
        !refButton2.current.contains(event.target)
      ) {
        setModal((prev) => (prev = false));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [refButton, refModal, setModal, refButton2]);

  // This component doesn't render anything, it just handles the closing logic
  return null;
};

export default ModalClose;