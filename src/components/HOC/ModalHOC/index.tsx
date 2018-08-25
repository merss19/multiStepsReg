import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {CustomModal, toggleModal} from "modules/CustomModal";
import {ModalTypes} from "modules/CustomModal";
import {connect} from "react-redux";
import {fetchDucks} from "modules/FetchDucks";

export const modalHOC =
  (WrappedComponent: React.ComponentType, moduleName: string, subModuleName: string) => {

  type ConnectedState = {
    isFetching: boolean
    isError: boolean
    errMsg: string
  }
  type ConnectedDispatch =  {
    toggleModal(data: boolean) : void
  }

  type Props = ConnectedState & ConnectedDispatch & RouteComponentProps<string>

   class WithModal extends React.Component<Props, {}> {

    static displayName = `withModal(${WrappedComponent.name})`;
     shouldComponentUpdate(nextProps:Props){
       return (
             nextProps.isFetching !== this.props.isFetching
         ||  nextProps.isError !== this.props.isError
         ||  nextProps.errMsg !== this.props.errMsg
       );
     }

     componentWillReceiveProps(nextProps: Props) {
       if (nextProps.isFetching !== this.props.isFetching ||
           nextProps.isError !== this.props.isError
       ) {
         const isOpen: boolean = nextProps.isFetching || nextProps.isError;
         this.props.toggleModal(isOpen);
       }
     }

    render() {
      const { isError, isFetching, errMsg, ...props} = this.props;
      const modal = isError ? ModalTypes.error : ModalTypes.info
      return (
        <div>
          <WrappedComponent {...props}/>
          <CustomModal
            modal={modal}
            resultText={errMsg}
            isLoader={this.props.isFetching}
          />
        </div>

      );
    }
  }
  const {
    selectIsFetching,
    selectIsError,
    selectErrMsg
  } = fetchDucks(moduleName, subModuleName);

  const mapStateToProps = (state: any): ConnectedState => {
    return {
      isFetching: selectIsFetching(state),
      isError: selectIsError(state),
      errMsg: selectErrMsg(state)
    };
  };
  return connect(mapStateToProps, {toggleModal})(WithModal)
};

