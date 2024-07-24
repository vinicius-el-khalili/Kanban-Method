import { create } from "zustand"

type ThemeStore = {
    mode:"dark"|"light"
    toggleMode: ()=>void
}

export const useThemeStore = create<ThemeStore>()((set,get)=>({

    mode:"dark",
    toggleMode: ()=>{
        set((state)=>({
            mode:state.mode=="dark"?"light":"dark",
        }))
    }

}))