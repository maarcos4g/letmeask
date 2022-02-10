import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ilustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import '../Home/styles.scss';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';
import { ref, push, set } from 'firebase/database'
import { database } from '../../services/firebase';

export function NewRoom() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');

    function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = ref(database, "rooms");

        const firebaseRoom = push(roomRef);

        set(firebaseRoom, {
            title: newRoom,
            authorId: user?.id,
        })
        navigate({ pathname: `/admin/rooms/${firebaseRoom.key}` })
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo.</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}