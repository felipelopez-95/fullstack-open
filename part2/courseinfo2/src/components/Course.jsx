import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    console.log(course);
    
    return (
        <div>
            {course.map(courses => (
            <div key={courses.id}>
                <Header course={courses.name} />
                <Content parts={courses.parts} />
                <Total total={courses.parts.reduce((accumulator, num) => accumulator + num.exercises, 0)}/>
            </div>
        ))}
        </div>
        
        
    )
}

export default Course