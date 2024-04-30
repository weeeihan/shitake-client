import { create } from 'zustand'

interface Store {
  isChooseRow: boolean
  setIsChooseRow: (bool: boolean) => void
  chooserID: string
  setChooserID: (id: string) => void

}

const useStore = create<Store>()((set) => ({
  isChooseRow: false,
  setIsChooseRow: (bool: boolean) => set(() => ({ isChooseRow: bool})),
  chooserID: '',
  setChooserID: (id: string) => set(() => ({ chooserID: id}))
}))

export default useStore