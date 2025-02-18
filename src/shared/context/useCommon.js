import { create } from 'zustand';

const useCommon = create((set) => ({
    parents: [],
    childs: null,
    setParents: (newValue) => set(() => ({ parents: newValue })),
    setChilds: (newValue) => set(() => ({ childs: newValue })),
    menu:[],
    setMenu:(newValue) => set(() => ({menu:newValue}))
}))

export default useCommon;