import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import ilustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import './styles.scss';
import { Button } from '../../components/Button';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import { ref, get } from 'firebase/database';

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        navigate({ pathname: "/rooms/new" });
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === "") {
            return;
        }

        const roomRef = await ref(database, `rooms/${roomCode}`);
        const getRoom = await get(roomRef);

        if (!getRoom.exists()) {
            alert("Room does not exist");
            return;
        }

        if (getRoom.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        navigate({ pathname: `/rooms/${roomCode}` })
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
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder='Digite o código da sala'
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}