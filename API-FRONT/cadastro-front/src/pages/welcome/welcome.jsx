import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div className="welcome-container" >
            <h1>Sistema de Cadastro</h1>
            <Link to="/cadastro">
                <button >
                    Ir para o Cadastro
                </button>
            </Link>
        </div>
    );
}

export default Welcome;