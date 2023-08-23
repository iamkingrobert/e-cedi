import React from "react";
import { Provider } from "react-redux";
import store from "../features/store";
import MoneyTransferModal from "./UserToUser";

const MoneyTransferModalWithRedux = ({ visible, onClose }) => {
  return (
    <>
      <Provider store={store}>
        <MoneyTransferModal visible={visible} onClose={onClose} />
      </Provider>
    </>
  );
};

export default MoneyTransferModalWithRedux;
