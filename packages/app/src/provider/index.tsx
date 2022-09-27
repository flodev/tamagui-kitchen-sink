import {NavigationProvider} from './navigation'
import {TamaguiProviderProps} from '@tamagui-extras/ui'
import {LmTamaguiProvider} from "./LmTamaguiProvider";

export function Provider({children, ...rest}: Omit<TamaguiProviderProps, 'config'>) {
    return (
        <LmTamaguiProvider {...rest}>
            <NavigationProvider>{children}</NavigationProvider>
        </LmTamaguiProvider>
    )
}
