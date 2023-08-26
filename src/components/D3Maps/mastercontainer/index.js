import React, { Fragment, useState, useEffect, useRef } from "react";

// import { useDisclosure } from "@chakra-ui/react";
// custom hook used to help handle common open, close, or toggle scenarios. It can be used to control feedback component such as Modal, AlertDialog, Drawer, etc.
// import { connect } from "react-redux";

import AppManager from "../utils/AppManager";
import initialState from "../../../context/globe/inititalState";
import Constants from "../utils/Constants";

import SearchPlaceView from "../searchplaceview";

const { MasterDrawerMenuType, AppNotifKey } = Constants;

const MasterContainer = (props) => {
	const { userConfig } = props;

	const [state, setState] = useState({});

	const updateState = (data) =>
		setState((preState) => ({ ...preState, ...data }));

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	/*  Life-cycles Methods */

	/*  Public Interface Methods */

	/*  UI Events Methods   */

	/*  Server Request Methods  */

	/*  Server Response Methods  */

	/*  Server Response Handler Methods  */

	/*  Custom-Component sub-render Methods */

	const renderMasterContainer = () => {
		return <SearchPlaceView menuType={MasterDrawerMenuType.Search} />;
	};

	return renderMasterContainer();
};

// const mapStateToProps = (state) => {
// 	return {
// 		userConfig: state.userConfig,
// 		userPref: state.userPref,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setUserConfig: (userConfig) =>
// 			dispatch(Actions.setUserConfig(userConfig)),
// 		setUserPref: (userPref) => dispatch(Actions.setUserPref(userPref)),
// 	};
// };

export default MasterContainer;

// export default connect(mapStateToProps, mapDispatchToProps)(MasterContainer);
