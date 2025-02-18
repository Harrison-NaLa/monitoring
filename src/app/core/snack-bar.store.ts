import {create} from 'zustand';

export interface ToastInterface {
    visible: boolean;
}
export interface ToastAction {
    show: () => void;
    hidden: () => void;
    toggle: () => void;
}

export type ToastModel = ToastInterface & ToastAction;

const useToastStore = create<ToastModel>((set, get) => ({
    ...{visible: false},
    show: () => {
        set(() => ({visible: false}));
        setTimeout(() => set(() => ({visible: true})), 100);
    },
    hidden: () => set(() => ({visible: false})),
    toggle: () => set(() => ({visible: !(get().visible)})),
}));

export default useToastStore;