type Gen<TFunc> = {
  getName: TFunc
}

function MakePropBFollowA<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
  person: Gen<TFunc>
  lastName: TLastName
}) {
  return null
}

const handleName: () => 'Hiep' = () => 'Hiep'

function App() {
  return <MakePropBFollowA person={{ getName: handleName }} lastName='Hiep' />
}
