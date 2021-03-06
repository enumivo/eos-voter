// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { mapValues } from 'lodash';

import * as ContractsActions from '../../actions/contracts';
import * as SettingsActions from '../../actions/settings';
import * as SystemStateActions from '../../actions/system/systemstate';
import * as TableActions from '../../actions/table';
import * as TransactionActions from '../../actions/transaction';
import * as WalletActions from '../../actions/wallet';

import ContractInterfaceComponent from '../../components/Contract/Interface/Component';

import ENUContract from '../../utils/ENU/Contract';

class ContractInterfaceContainer extends Component<Props> {
  render() {
    return (
      <ContractInterfaceComponent {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  // Wrap all contracts in the associated helper
  const contracts = mapValues(state.contracts, (contract) =>
    new ENUContract(contract.abi, contract.account_name));
  return {
    blockExplorers: state.blockexplorers[state.connection.chainKey],
    contracts,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ContractsActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ContractInterfaceContainer);
