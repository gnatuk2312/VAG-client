import cn from "classnames";

const Form = (props) => {
  const {
    className,
    nameValidation,
    phoneValidation,
    emailValidation,
    onSubmit,
    submitText = "Записатись",
  } = props;

  return (
    <form className={cn("form", className)}>
      <p className="form__hint">2. Заповни особисту інформацію про себе</p>
      <div className="form__inputs-wrapper">
        <label htmlFor="form__input-name" className="form__form-label">
          <span className="form__form-label-text">Ім’я:</span>
          <div className="form__input-wrapper">
            <input
              type="text"
              id="form__input-name"
              className={cn("form__input", {
                form__input_error: nameValidation.inputValid === false && nameValidation.isDirty,
              })}
              onChange={(event) => nameValidation.onChange(event)}
              onBlur={(event) => nameValidation.onBlur(event)}
              value={nameValidation.value}
            />

            {nameValidation.isDirty && nameValidation.isEmpty && (
              <p className="form__error">*введіть ім’я</p>
            )}
          </div>
        </label>
        <label
          htmlFor="form__input-phone"
          className="form__form-label book-appointment__form-label_centered"
        >
          <span className="form__form-label-text">Номер телефону:</span>
          <div className="form__input-wrapper">
            <input
              type="text"
              id="form__input-phone"
              className={cn("form__input", {
                form__input_error: phoneValidation.inputValid === false && phoneValidation.isDirty,
              })}
              onChange={(event) => phoneValidation.onChange(event)}
              onBlur={(event) => phoneValidation.onBlur(event)}
              value={phoneValidation.value}
            />
            {phoneValidation.isDirty &&
              (phoneValidation.isEmpty || phoneValidation.isPhoneError) && (
                <p className="form__error">*введіть номер телефону</p>
              )}
          </div>
        </label>
        <label htmlFor="form__input-email" className="form__form-label">
          <span className="form__form-label-text">Email:</span>
          <div className="form__input-wrapper">
            <input
              type="text"
              id="form__input-email"
              className={cn("form__input", {
                form__input_error:
                  emailValidation.inputValid === false &&
                  emailValidation.isDirty &&
                  emailValidation.value !== "",
              })}
              onChange={(event) => emailValidation.onChange(event)}
              onBlur={(event) => emailValidation.onBlur(event)}
              value={emailValidation.value}
            />
            {emailValidation.isDirty &&
              emailValidation.isEmailError &&
              emailValidation.value !== "" && (
                <p className="form__error">
                  *введіть електронну пошту такого формату: <span>test@gmail.com</span>
                </p>
              )}
          </div>
        </label>
      </div>
      <button
        disabled={
          !nameValidation.inputValid ||
          !phoneValidation.inputValid ||
          (!emailValidation.inputValid && emailValidation.value !== "")
        }
        onClick={onSubmit}
        type="submit"
        className="form__submit"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form;
