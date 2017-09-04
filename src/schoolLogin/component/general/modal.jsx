import React, { Component } from 'react';
import ReactModal from 'react-modal'
const style = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '8px',
        outline: 'none',
        padding: '20px'
    }
}

// class Modal extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             showModal:props.showModal
//         }
//         this.handleCloseModal = this.handleCloseModal.bind(this)
//     }
   

//     render(){
//         return(
//             <ReactModal style={style} isOpen={this.props.showModal}>
//                 <div className="modal-cross close" onClick={this.props.handleCloseModal}>X</div>
//                <div className="modal-layer">

//                </div>
//             </ReactModal>
//         )
//     }
// }


const Modal = props =>{
    return(
        <ReactModal style={style} isOpen={props.showModal}>
            <div className="modal-cross close" onClick={props.handleCloseModal}>x</div>
           <div className="modal-layer">
            {props.content}
           </div>
        </ReactModal>
    )
}
export default Modal;

