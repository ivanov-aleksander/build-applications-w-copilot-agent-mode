import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-__v').sort({ displayName: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'displayName').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/teams', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(
      await Activity.find(filter).populate('user', 'displayName').sort({ completedAt: -1 }),
    );
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/activities', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(
      await LeaderboardEntry.find()
        .populate('user', 'displayName')
        .populate('team', 'name')
        .sort({ points: -1 })
        .limit(100),
    );
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/leaderboard', async (request, response, next) => {
  try {
    const entry = await LeaderboardEntry.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {};
    response.json(await Workout.find(filter).sort({ title: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/workouts', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default apiRouter;