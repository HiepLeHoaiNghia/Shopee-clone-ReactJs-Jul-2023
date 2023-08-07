import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { ObjectSchema } from 'yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver<FormData>(nameSchema as ObjectSchema<FormData>)
  })
  const onSubmitSearch = handleSubmit((data) => {
    if (data.name === '') {
      navigate({
        pathname: path.home,
        search: ''
      })
    } else {
      const config = queryConfig.order
        ? omit(
            {
              ...queryConfig,
              name: data.name
            },
            ['sort_by', 'order']
          )
        : omit({
            ...queryConfig,
            name: data.name
          })
      navigate({
        pathname: path.home,
        search: createSearchParams(config as unknown as string).toString()
      })
    }
  })
  return { register, onSubmitSearch }
}
