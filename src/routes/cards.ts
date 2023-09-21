import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import AuthorizedUser from '../middlewares/auth';

const cardsRouter = Router();

cardsRouter.get('/', AuthorizedUser, getCards);
cardsRouter.post('/', AuthorizedUser, createCard);
cardsRouter.delete('/:cardId', AuthorizedUser, deleteCard);
cardsRouter.put('/:cardId/likes', AuthorizedUser, likeCard);
cardsRouter.delete('/:cardId/likes', AuthorizedUser, dislikeCard);

export default cardsRouter;
