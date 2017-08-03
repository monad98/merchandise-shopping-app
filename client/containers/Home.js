import React from 'react';
import { connect } from 'react-redux';
import GuestHomeComponent from '../components/GuestHome';
import { getUserInfo} from "../reducers/index";
import SelectSearchComponent from "../components/SelectSearch";

const HomeContainer = ({user}) => {
  return (
    <div>
      {!user && <GuestHomeComponent/>}
      {user && <SelectSearchComponent/>}
    </div>
  )
};


export default connect(
  (state) => ({ user: getUserInfo(state) })
)(HomeContainer);


