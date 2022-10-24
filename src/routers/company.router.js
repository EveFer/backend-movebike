import express, { response } from 'express'
import * as companyUsesCases from '../usesCases/company.use.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()


//GET /companies
router.get('/', async(request, response, next) => {
    try {
        const allCompanies = await companyUsesCases.getAll()

        response.json({
            success: true,
            message: 'All companies',
            data: {
                companies: allCompanies
            }
        })
    } catch (error) {
        next(error)
    }
})

//GET /idMoto
router.get('/:idCompany', async(request, response, next) => {
    try {
        const { idCompany } = request.params

        const getCompany = await companyUsesCases.getById(idCompany)

        response.json({
            success: true,
            message: 'Company',
            data: {
                company: getCompany
            }
        })
    } catch (error) {
        next(error)
    }
})

// POST /companies
router.post('/', async(request, response, next) => {
    try {
        const { body: newCompany } = request
        const companyCreated = await companyUsesCases.create(newCompany)

        response.json({
            success: true,
            message: 'Company created',
            data: companyCreated
        })
    } catch (error) {
        next(error)
    }
})

//DELETE /idCompany
router.delete('/:idCompany', async(request, response, next) => {
    try {
        const { idCompany } = request.params

        const companyDeleted = await companyUsesCases.deleteById(idCompany)

        response.json({
            success: true,
            message: 'Company deleted',
            data: {
                company: companyDeleted
            }
        })
    } catch (error) {
        next(error)
    }
})

//PATCH /idCompany
router.patch('/:idCompany', async(request, response, next) => {
    try {
        const { idCompany } = request.params
        const unUpdateCompany = request.body

        const companyUpdated = await companyUsesCases.update(idCompany, unUpdateCompany)

        response.json({
            success: true,
            message: 'Company updated',
            data: {
                company: companyUpdated
            }
        })
    } catch (error) {
        next(error)
    }
})

export default router