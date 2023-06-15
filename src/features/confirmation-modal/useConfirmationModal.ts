import {useState} from "react";
import {ModalState} from "features/confirmation-modal/types";


interface confirmationHookType {
    state: ModalState
    createConfirmationModal: ({title, text}: { title: string, text: string }) => void
    closeModal: () => void
}

export function useConfirmationModal(): confirmationHookType {
    const [state, setState] = useState({
        isOpen: false,
        title: '',
        text: ''
    })

    const createConfirmationModal = ({title, text}: { title: string, text: string }) => {
        setState({
            isOpen: true,
            title,
            text
        })
    }

    const closeModal = () => {
        setState({isOpen: false, title: '', text: ''})
    }

    return {
        state,
        createConfirmationModal,
        closeModal
    }
}
