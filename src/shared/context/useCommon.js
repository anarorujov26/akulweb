import { create } from 'zustand';

const useCommon = create((set) => ({
    parents: [],
    childs: null,
    setParents: (newValue) => set(() => ({ parents: newValue })),
    setChilds: (newValue) => set(() => ({ childs: newValue }))
}))

export default useCommon;