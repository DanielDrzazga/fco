const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <TotalExercises exercises={totalExercises} />
      </div>
    )
  }

  const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
  };

  const Content = ({ parts }) => {
    return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
    )
  };

  const Part = ({ name, exercises }) => {
    return (
    <p>
      {name} {exercises}
    </p>
    )
  };

  const TotalExercises = ({exercises}) => {
    return (
        <p><strong>Total exercises: {exercises}</strong></p>
    )
  }
  export default Course;