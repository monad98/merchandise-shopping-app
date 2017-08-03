import React from 'react';
import PropTypes from 'prop-types'
import StoreCellComponent from './StoreCell';

const StoreListComponent = ({stores}) => (
  <div className="panel panel-primary">
    <div className="panel-heading">
      <h3 className="panel-title"><i className="glyphicon glyphicon-th-list"/> Search results</h3>
    </div>
    <div className="panel-body">
      {stores.map((store, idx) =>
        (
          <div key={idx} className="row">
            <div className="col-sm-10 col-lg-10 col-md-10">
              <StoreCellComponent idx={idx+1} store={store}/>
            </div>
          </div>
        )
      )}
    </div>
  </div>

);

StoreListComponent.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      stateProvCode: PropTypes.string,
      city: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired
    }).isRequired
  )
};

export default StoreListComponent;