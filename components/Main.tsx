import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';

export default function Main({ props }) {
  useEffect(() => {
    props.fetchUser();
  }, []);
  const { currentUser } = props;
  console.log(currentUser);
  return (
    <>
      {currentUser == undefined ? (
        <View></View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>User is logged in</Text>
        </View>
      )}
    </>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
