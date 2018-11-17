export default `
  .react-phone-number-input__row
  {
    /* This is done to stretch the contents of this component */
    display     : flex;
    align-items : center;
  }

  .react-phone-number-input__phone
  {
    /* The phone number input stretches to fill all empty space */
    flex : 1;

    /* The phone number input should shrink
      to make room for the extension input */
    min-width : 0;
  }

  .react-phone-number-input__icon
  {
    width      : 1.24em;
    height     : 0.93em;

    border     : 1px solid rgba(0, 0, 0, 0.5);

    box-sizing : content-box;
  }

  .react-phone-number-input__icon--international
  {
    width  : calc(0.93em + 2px);
    height : calc(0.93em + 2px);

    padding-left  : 0.155em;
    padding-right : 0.155em;

    border : none;
  }

  .react-phone-number-input__error
  {
    margin-left : calc(1.24em + 2px + 0.3em + 0.35em + 0.5em);
    margin-top  : calc(0.3rem);
    color       : #D30F00;
  }

  .react-phone-number-input__icon-image
  {
    max-width  : 100%;
    max-height : 100%;
  }

  .react-phone-number-input__ext-input::-webkit-inner-spin-button,
  .react-phone-number-input__ext-input::-webkit-outer-spin-button
  {
    margin             : 0 !important;
    -webkit-appearance : none !important;
    -moz-appearance    : textfield !important;
  }

  .react-phone-number-input__ext-input
  {
    width : 3em;
  }

  .react-phone-number-input__ext
  {
    white-space: nowrap;
  }

  .react-phone-number-input__ext,
  .react-phone-number-input__ext-input
  {
    margin-left : 0.5em;
  }

  .react-phone-number-input__country--native
  {
    position     : relative;
    align-self   : stretch;
    display      : flex;
    align-items  : center;
    margin-right : 0.5em;
  }

  .react-phone-number-input__country-select
  {
    position : absolute;
    top      : 0;
    left     : 0;
    height   : 100%;
    width    : 100%;
    z-index  : 1;
    border   : 0;
    opacity  : 0;
    cursor   : pointer;
  }

  .react-phone-number-input__country-select-arrow
  {
    display            : block;
    content            : '';
    width              : 0;
    height             : 0;
    margin-bottom      : 0.1em;
    margin-top         : 0.3em;
    margin-left        : 0.3em;
    border-width       : 0.35em 0.2em 0 0.2em;
    border-style       : solid;
    border-left-color  : transparent;
    border-right-color : transparent;
    color              : #B8BDC4;
    opacity            : 0.7;
    transition         : color 0.1s;
  }

  /* Something from stackoverflow. */
  .react-phone-number-input__country-select-divider
  {
    font-size  : 1px;
    background : black;
  }

  .react-phone-number-input__country-select:focus + .react-phone-number-input__country-select-arrow
  {
    color : #03B2CB;
  }

  /* Styling phone number input */

  .react-phone-number-input__input
  {
    height        : calc(0.3rem * 6);
    outline       : none;
    border-radius : 0;
    padding       : 0;
    appearance    : none;
    border        : none;
    border-bottom : 1px solid #C5D2E0;
    transition    : border 0.1s;
    font-size     : inherit;
  }

  .react-phone-number-input__input:focus
  {
    border-color : #03B2CB;
  }

  .react-phone-number-input__input--disabled
  {
    cursor : default;
  }

  .react-phone-number-input__input--invalid,
  .react-phone-number-input__input--invalid:focus
  {
    border-color : #EB2010;
  }

  /* Overrides Chrome autofill yellow background color */
  .react-phone-number-input__input:-webkit-autofill
  {
    box-shadow : 0 0 0 1000px white inset;
  }

  .react-phone-number-input__country .rrui__select__button
  {
    border-bottom : none;
  }
`;
