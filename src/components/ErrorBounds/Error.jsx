import Style from "../../styles/components/errorBounds/error.module.scss";
import Section from "../../UI_kit/Section";

// ui компонент при отлове ошибки отобразится он
const Error = () => {
  return (
    <main>
      <Section>
        <div className={Style.error_block}>
          <div className={Style.errorMobileCenter}>
            <div className={Style.error}>
              <div className={Style.errorText}>
                <p className={Style.errorTextWow}>О нет..</p>
                <h2>
                  Что-то <br /> <b>пошло</b> не так...
                </h2>
                <p className={Style.errorTextSorry}>
                  Приносим свои извинения, пожалуйста, перезагрузите страницу.
                </p>
                <button
                  className={Style.error_reload}
                  onClick={() => {
                    window.location.reload();
                  }}
                  title="Перезагрузить страницу"
                >
                  Перезагрузить страницу
                </button>
              </div>
              <div>
                <img
                  src="../../../../../../../img/Error/error1.png"
                  alt='Illustration by <a href="https://icons8.com/illustrations/author/lZpGtGw5182N">Elisabet Guba</a> from <a href="https://icons8.com/illustrations">Ouch!</a>'
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Error;
