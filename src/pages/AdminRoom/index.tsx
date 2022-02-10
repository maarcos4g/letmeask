import { useNavigate, useParams } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg'

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import '../Room/styles.scss';
import { ref, remove, update } from 'firebase/database';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const navigate = useNavigate();
    //const { user } = useAuth();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(`${roomId}`);

    console.log(questions)

    async function handleEndRoom() {
        const roomRef = await ref(database, `rooms/${roomId}`);
        update(roomRef, {
            endedAt: new Date(),
        })

        navigate({ pathname: "/" })
    }



    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
            const questionRef = await ref(database, `rooms/${roomId}/questions/${questionId}`);
            remove(questionRef);
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        const questionRef = await ref(database, `rooms/${roomId}/questions/${questionId}`);
        update(questionRef, {
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        const questionRef = await ref(database, `rooms/${roomId}/questions/${questionId}`);
        update(questionRef, {
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo Letmeask" />
                    <div>
                        <RoomCode code={`${roomId}`} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map((question) => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque' a pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>

            </main>

        </div>
    );
}