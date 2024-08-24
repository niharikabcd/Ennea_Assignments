import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

public class StudentManagerTest {

    private StudentManager manager;

    @BeforeEach
    public void setUp() {
        manager = new StudentManager();
    }

    //Basic Add functionality test case
    @Test
    public void testAddStudent() {
        manager.addStudent("Elena", 1);
        assertEquals(1, manager.getStudentNames().size());
        assertTrue(manager.getStudentIds().contains(1));
        assertEquals("Elena", manager.getStudentData().get(1));
    }

    @Test
    public void testAddDuplicateStudentId() {
        manager.addStudent("Elena", 1);
        manager.addStudent("Caroline", 1);
        assertEquals(1, manager.getStudentNames().size()); // No duplicate ID allowed
        assertEquals("Elena", manager.getStudentData().get(1)); // Original name should remain
    }

    //basic Remove functionality test case
    @Test
    public void testRemoveStudent() {
        manager.addStudent("Elena", 1);
        manager.removeStudent(1);
        assertEquals(0, manager.getStudentNames().size());
        assertFalse(manager.getStudentIds().contains(1));
        assertNull(manager.getStudentData().get(1));
    }

    @Test
    public void testRemoveNonExistentStudent() {
        manager.addStudent("Elena", 1);
        manager.removeStudent(2); // Non-existent ID
        assertEquals(1, manager.getStudentNames().size()); // Nothing should be removed
    }

    @Test
    public void testSearchStudentName() {
        manager.addStudent("Elena", 1);
        assertEquals("Elena", manager.searchStudentName(1));
        assertNull(manager.searchStudentName(2)); // Non-existent ID
    }

    //basic test case for checking existance and size of the list
    @Test
    public void testGetStudentNames() {
        manager.addStudent("Elena", 1);
        manager.addStudent("Caroline", 2);
        assertEquals(2, manager.getStudentNames().size());
        assertTrue(manager.getStudentNames().contains("Elena"));
        assertTrue(manager.getStudentNames().contains("Caroline"));
    }

    //basic test case for checking existance and size of the set
    @Test
    public void testGetStudentIds() {
        manager.addStudent("Elena", 1);
        manager.addStudent("Caroline", 2);
        assertEquals(2, manager.getStudentIds().size());
        assertTrue(manager.getStudentIds().contains(1));
        assertTrue(manager.getStudentIds().contains(2));
    }

    @Test
    public void testGetStudentData() {
        manager.addStudent("Elena", 1);
        manager.addStudent("Caroline", 2);
        assertEquals(2, manager.getStudentData().size());
        assertEquals("Elena", manager.getStudentData().get(1));
        assertEquals("Caroline", manager.getStudentData().get(2));//Test for getting approriate name with student id
    }
    @Test
    public void testAddStudent2(){
        manager.addStudent("kai", 45);
        manager.addStudent("kai", 34);
        assertEquals(2,manager.getStudentNames().size());//Duplicate names are allowed
    }
}