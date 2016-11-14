import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
class FModal extends React.Component {
    constructor () {
      super();
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.state = {
        open: false
      }
    }

    openModal () { this.setState({open: true}); }

    closeModal () { this.setState({open: false}); }

    render () {
      return (
        <div>
          <button onClick={this.openModal}
            className="factigis_submitButton btn btn-success"
            title="Ir " type="button" >
            <span><i className="fa fa-plus"></i> Agregar</span>
          </button>
          <Modal isOpen={this.state.open}>
            <h1>Basic Modal</h1>
            <button onClick={this.closeModal}>Close</button>
            <input />
            <input />
          </Modal>
        </div>
      );
    }
  }

export default FModal;
