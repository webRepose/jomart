import Style from "../../styles/components/preloaders/preloader/preloader.module.scss";

// прелоадер для прогрузки прежде чем показать контент
const Preloader = () => {
  return (
    <div className={Style.loader_pos}>
      <div className={Style.loader}>
        <div className={Style.bar1}></div>
        <div className={Style.bar2}></div>
        <div className={Style.bar3}></div>
        <div className={Style.bar4}></div>
        <div className={Style.bar5}></div>
        <div className={Style.bar6}></div>
        <div className={Style.bar7}></div>
        <div className={Style.bar8}></div>
        <div className={Style.bar9}></div>
        <div className={Style.bar10}></div>
        <div className={Style.bar11}></div>
        <div className={Style.bar12}></div>
      </div>
    </div>
  );
};

export default Preloader;
