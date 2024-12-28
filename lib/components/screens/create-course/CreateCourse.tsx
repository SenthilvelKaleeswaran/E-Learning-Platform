"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PageHeader, RenderSpace } from "@/lib/components/shared";
import { Button, Input, Tab, TabList, Tabs } from "@/lib/components/ui";
import { useCreateCourse } from "@/lib/hooks";

// Define the types for the course, chapters, and topics
interface Topic {
  id?: string;
  name: string;
  description: string;
  link: string;
}

interface Chapter {
  isCurrent?: boolean | null;
  id?: string;
  name: string;
  topics: Topic[];
}

interface Course {
  id?: string;
  name: string;
  imageUrl: string;
  chapters: Chapter[];
}

const CreateCourse: React.FC = ({ courseDetails }: any) => {
  const [course, setCourse] = useState<Course>(courseDetails);

  const courseId = courseDetails?.id || null;

  // const getCurrentChapter = useMemo(()=>{
  //   return courseDetails?.chapters?.find(
  //     (item: any) => item?.isCurrent
  //   ) || {
  //     name: "",
  //     topics: [],
  //   };
  // },[courseDetails?.chapters])

  const [newChapter, setNewChapter] = useState<Chapter>({
    name: "",
    topics: [],
  });

  const [editMode, setEditMode] = useState({
    chapter: false,
    topic: false,
    prevChapter: {},
    prevTopic: {},
  });

  useEffect(() => {
    const getCurrentChapter = courseDetails?.chapters?.find(
      (item: any) => item?.isCurrent
    ) || {
      name: "",
      topics: [],
    };
    setNewChapter(getCurrentChapter);
    setEditMode((prev) => ({
      ...prev,
      chapter: getCurrentChapter?.isCurrent,
      prevChapter: getCurrentChapter,
    }));
  }, [courseDetails?.chapters]);

  console.log({ newChapter });

  const [newTopic, setNewTopic] = useState<Topic>({
    id: "",
    name: "",
    description: "",
    link: "",
  });

  console.log({ course, newChapter, newTopic });

  const [showTopicForm, setShowTopicForm] = useState(false);

  const chapterList = courseDetails?.chapters;

  const handleToggleTopic = (show: boolean) => {
    setShowTopicForm(show);
    setNewTopic({
      name: "",
      description: "",
      link: "",
    });
  };

  console.log({ showTopicForm });

  const handleEditCurrentTopic = (index: any, topics: any) => {
    const data = topics[index];
    setNewTopic(data);
    setShowTopicForm(true);
    setEditMode((prev) => ({ ...prev, topic: true, prevTopic: data }));
  };

  const handleEditTopic = (
    topicIndex: number,
    chapterIndex: number,
    chapterId: any
  ) => {
    updateChapter(
      { id: chapterId, isCurrent: true },
      {
        onSuccess: () => {
          handleEditChapter(chapterIndex);
          handleEditCurrentTopic(
            topicIndex,
            courseDetails?.chapters[chapterIndex].topics
          );
        },
      }
    );
  };

  const handleEditChapter = (chapterIndex: number) => {
    const curr = courseDetails.chapters[chapterIndex];
    setNewChapter(curr);
    setEditMode((prev) => ({
      ...prev,
      chapter: true,
      prevChapter: { ...curr },
      topic: false,
    }));
  };

  console.log({ editMode, newChapter, course });

  const {
    createChapter,
    deleteChapter,
    updateChapter,
    createTopic,
    updateTopic,
    deleteTopic,
    isChapterCreating,
    isChapterDeleting,
    isChapterUpdating,
    isTopicCreating,
    isTopicDeleting,
    isTopicUpdating,
  } = useCreateCourse();

  const editPanelButton = () => {
    const areChaptersEqual = (a: Chapter, b: Chapter) => {
      // Compare primitive fields
      if (a.name !== b.name || a.id !== b.id) return true;

      // Compare topics array
      if (a.topics.length !== b.topics.length) return true;
      for (let i = 0; i < a.topics.length; i++) {
        const topicA = a.topics[i];
        const topicB = b.topics[i];
        if (
          topicA.name !== topicB.name ||
          topicA.description !== topicB.description ||
          topicA.link !== topicB.link
        ) {
          return true;
        }
      }
      return false;
    };

    console.log({ newChapter, editMode: editMode.prevChapter });

    return areChaptersEqual(newChapter, editMode?.prevChapter as Chapter);
  };

  const isEdited = editPanelButton();

  console.log({ qqq: newChapter, editMode: editMode?.prevChapter });

  const handleNewChapter = (data: any = {}, callBack?: any) => {
    const editData = {
      id: newChapter?.id,
      isCurrent: false,
      ...data,
    };
    console.log({ updated: callBack });
    updateChapter(editData, {
      onSuccess: () => {
        console.log({ updated: "succss" });
        if (callBack) {
          callBack();
        } else if (!data?.isCurrent) {
          setNewChapter({
            name: "",
            topics: [],
          });
          setNewTopic({
            id: "",
            name: "",
            description: "",
            link: "",
          });
          setShowTopicForm(false);
          setEditMode((prev) => ({
            ...prev,
            topic: false,
            chapter: false,
          }));
        }
      },
    });
  };

  const isTopicChanged = (prev: any, curr: any) => {
    return (
      prev?.name === curr?.name &&
      prev?.description === curr?.description &&
      prev?.link === curr?.link
    );
  };

  const handleSubmitEdited = () => {
    const data: any = {};
    if (newChapter?.name !== (editMode as any)?.prevChapter?.name) {
      data.name = newChapter?.name;
      data.isCurrent = true;
    }
    handleNewChapter(data, () => {
      setNewChapter((prev) => ({
        ...prev,
        ...data,
      }));
      setEditMode((prev) => {
        const updatedEditMode = {
          ...prev,
          prevChapter: {
            ...prev.prevChapter,
            ...data,
          },
        };
        return updatedEditMode;
      });
    });
  };

  const isChpterChanged =
    editMode?.chapter &&
    newChapter?.name !== (editMode as any)?.prevChapter?.name;
  console.log({ isChpterChanged, newChapter, prev: editMode, isEdited });

  const handleEditCancelChapter = () => {
    if (isEdited) {
      setNewChapter((editMode as any)?.prevChapter);
    } else {
      handleNewChapter({ name: newChapter?.name });
    }
  };

  const renderFinalChpterButton = () => {
    return (
      <div className="flex gap-2">
        <RenderSpace condition={isChpterChanged}>
          <Button
            onClick={handleSubmitEdited}
            disabled={
              (!newChapter.name.trim() && newChapter?.name?.length < 3) ||
              isChapterUpdating ||
              newChapter?.name === (editMode as any)?.prevChapter?.name
            }
          >
            Submit Edited
          </Button>
        </RenderSpace>
        <RenderSpace condition={newChapter?.topics?.length !== 0}>
          <Button
            onClick={handleEditCancelChapter}
            disabled={
              (!newChapter.name.trim() && newChapter?.name?.length < 3) ||
              isChapterUpdating
            }
          >
            {isEdited ? "Cancel Edited" : "Submit Chapter"}
          </Button>
        </RenderSpace>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen space-y-4">
      <div className="flex justify-between">
        <PageHeader title="Create Course" />
        <Button onClick={() => {}}>Create</Button>
      </div>
      <div>
        <div className="flex gap-4 space-y-4 p-4 border bg-white border-gray-500 rounded-md">
          <div className="space-y-4 w-full">
            <Input
              id="course-name"
              type="text"
              label="Course Name"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              placeholder="Enter course name"
            />
            <Input
              id="image-url"
              type="text"
              label="Image URL"
              value={course.imageUrl}
              onChange={(e) =>
                setCourse({ ...course, imageUrl: e.target.value })
              }
              placeholder="Enter image URL"
            />
          </div>
          <RenderSpace condition={!!course.imageUrl}>
            <img
              src={course.imageUrl}
              alt="Course Preview"
              className="w-48 h-48 object-cover rounded-md border flex"
            />
          </RenderSpace>
        </div>
      </div>
{/* 
      <Tabs defaultTab={""} >
        <TabList>
          <Tab id="Add"></Tab>
          <Tab id="COMPLETED">Finished</Tab>
        </TabList>
      </Tabs> */}

      <RenderSpace condition={true}>
        <div className="mt-6 bg-white p-6 rounded-md shadow-md border border-black space-y-4">
          <div className="flex gap-4 justify-between items-center">
            <h3 className="text-lg font-semibold">
              {/* {editMode?.chapter ? "Edit Chapter" : "Add Chapter"} */}
              Chapter
            </h3>
            <div className="flex gap-2">
              {newChapter?.id ? (
                renderFinalChpterButton()
              ) : (
                <Button
                  onClick={() =>
                    createChapter({
                      name: newChapter?.name,
                      courseId,
                    })
                  }
                  disabled={
                    (!newChapter?.name?.trim() &&
                      newChapter?.name?.length < 3) ||
                    isChapterCreating
                  }
                >
                  Create Chapter
                </Button>
              )}
            </div>
          </div>

          <Input
            id="chapter-name"
            type="text"
            label="Chapter Name"
            value={newChapter?.name}
            onChange={(e) =>
              setNewChapter({ ...newChapter, name: e.target.value })
            }
            placeholder="Enter chapter name"
          />
          <RenderSpace condition={!!newChapter?.id}>
            <Button
              onClick={() => handleToggleTopic(true)}
              disabled={!newChapter?.name?.trim() || isChapterUpdating}
            >
              Add Topic
            </Button>
          </RenderSpace>
        </div>
      </RenderSpace>

      <RenderSpace condition={showTopicForm}>
        <div className=" bg-gray-50 p-4 rounded-md border border-black space-y-4">
          <h4 className="text-sm font-medium text-gray-800">
            {editMode.topic ? "Edit Topic" : "Add Topic"}
          </h4>
          <Input
            id="topic-name"
            type="text"
            label="Topic Name"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            placeholder="Enter topic name"
          />
          <Input
            id="topic-description"
            type="text"
            label="Description"
            value={newTopic.description}
            onChange={(e) =>
              setNewTopic({ ...newTopic, description: e.target.value })
            }
            placeholder="Enter topic description"
          />
          <Input
            id="topic-link"
            type="text"
            label="Link"
            value={newTopic.link}
            onChange={(e) => setNewTopic({ ...newTopic, link: e.target.value })}
            placeholder="Enter topic link"
          />
          <div className="flex gap-4">
            <Button
              onClick={() => {
                if (newTopic?.id) {
                  updateTopic(newTopic, {
                    onSuccess: () => {
                      setEditMode((prev) => ({ ...prev, topic: false }));
                      setShowTopicForm(false);
                    },
                  });
                } else {
                  const { id, ...rest } = newTopic;
                  createTopic(
                    { ...rest, chapterId: newChapter?.id },
                    {
                      onSuccess: () => handleToggleTopic(false),
                    }
                  );
                }
              }}
              disabled={
                !newTopic.name.trim() ||
                !newTopic.description.trim() ||
                !newTopic.link.trim() ||
                isTopicCreating ||
                isTopicUpdating ||
                (editMode?.topic &&
                  isTopicChanged(editMode?.prevTopic, newTopic))
              }
            >
              {newTopic?.id ? "Update " : "Create "}
              Topic
            </Button>
            <Button
              onClick={() => {
                handleToggleTopic(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </RenderSpace>

      <RenderSpace condition={newChapter?.topics?.length}>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">Topics Added</h3>
          {newChapter?.topics?.map((topic, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md mt-2 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">{topic.name}</p>
                <p className="text-xs text-gray-600">{topic.description}</p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    handleEditCurrentTopic(index, newChapter?.topics)
                  }
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteTopic(topic?.id)}
                  disabled={isTopicDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </RenderSpace>

      <RenderSpace condition={chapterList?.length}>
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Chapters:</h3>
          {chapterList?.map((chapter: any, index: any) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mt-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium">{chapter.name}</h4>
                {chapter?.id === newChapter?.id ? (
                  <div className="flex gap-4 items-center">
                    <p>On Edit Panel</p>
                    {renderFinalChpterButton()}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        updateChapter(
                          { id: chapter?.id, isCurrent: true },
                          { onSuccess: () => handleEditChapter(index) }
                        );
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => deleteChapter(chapter?.id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <RenderSpace condition={chapter?.topics?.length}>
                  <h5 className="text-md font-medium">Topics:</h5>
                  {chapter.topics.map((topic: any, topicIndex: any) => (
                    <div
                      key={topicIndex}
                      className="bg-gray-100 p-2 rounded-md mt-2 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium">{topic.name}</p>
                        <p className="text-xs text-gray-600">
                          {topic.description}
                        </p>
                      </div>
                      <RenderSpace condition={chapter?.id !== newChapter?.id}>
                        <div className="space-x-2">
                          <Button
                            onClick={() =>
                              handleEditTopic(topicIndex, index, chapter?.id)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteTopic(topic?.id)}
                            disabled={
                              isTopicDeleting || chapter?.topics?.length === 1
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </RenderSpace>
                    </div>
                  ))}
                </RenderSpace>
              </div>
            </div>
          ))}
        </div>
      </RenderSpace>
    </div>
  );
};

export default CreateCourse;
