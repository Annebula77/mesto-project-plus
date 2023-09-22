import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards';
import AuthorizedUser from '../middlewares/auth';
import { cardIdValidator, createCardValidator } from '../utils/validators';

const cardsRouter = Router();

cardsRouter.get('/', AuthorizedUser, getCards);
cardsRouter.post('/', AuthorizedUser, createCardValidator, createCard);
cardsRouter.delete('/:cardId', AuthorizedUser, cardIdValidator, deleteCard);
cardsRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardsRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardsRouter;
