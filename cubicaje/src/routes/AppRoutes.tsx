import { Route, Routes } from 'react-router-dom';
import { CalculatorScreen } from '../screens/CalculatorScreen';

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<CalculatorScreen/>}/>
        </Routes>
    );
}