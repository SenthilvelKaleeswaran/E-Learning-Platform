"use client";
import { Button, Input } from "@/lib/components/ui";
import { useCreateCourse } from "@/lib/hooks";
import { PageHeader, RenderSpace } from "@/lib/components/shared";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/lib/components/ui";
import React, { useEffect, useState } from "react";

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
  const [newChapter, setNewChapter] = useState<Chapter>({
    name: "",
    topics: [],
  });
  const [newTopic, setNewTopic] = useState<Topic>({
    id: "",
    name: "",
    description: "",
    link: "",
  });
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [editMode, setEditMode] = useState({
    chapter: false,
    topic: false,
    prevChapter: {},
    prevTopic: {},
  });

  const chapterList = courseDetails?.chapters;

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

  const handleToggleTopic = (show: boolean) => {
    setShowTopicForm(show);
    setNewTopic({
      name: "",
      description: "",
      link: "",
    });
  };

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

  const handleNewChapter = (data: any = {}, callBack?: any) => {
    const editData = {
      id: newChapter?.id,
      isCurrent: false,
      ...data,
    };
    updateChapter(editData, {
      onSuccess: () => {
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

  const isChapterChanged =
    editMode?.chapter &&
    newChapter?.name !== (editMode as any)?.prevChapter?.name;

  const handleEditCancelChapter = () => {
    if (isChapterChanged) {
      setNewChapter((editMode as any)?.prevChapter);
    } else {
      handleNewChapter({ name: newChapter?.name });
    }
  };

  const renderFinalChapterButton = () => {
    return (
      <div className="flex gap-2">
        <RenderSpace condition={isChapterChanged}>
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
            {isChapterChanged ? "Cancel Edited" : "Submit Chapter"}
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

      <Tabs defaultTab="add-chapter">
        <TabList>
          <Tab id="add-chapter">Add Chapter</Tab>
          {chapterList?.map((chapter: any, chapterIndex: number) => (
            <Tab key={chapterIndex} id={`chapter-${chapterIndex}`}>
              Chapter {chapterIndex + 1}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel id="add-chapter">
            <div className="mt-6 bg-white p-6 rounded-md shadow-md border border-black space-y-4">
              <div className="flex gap-4 justify-between items-center">
                <h3 className="text-lg font-semibold">Chapter</h3>
                <div className="flex gap-2">
                  {newChapter?.id ? (
                    renderFinalChapterButton()
                  ) : (
                    <Button
                      onClick={() => {
                        const data: any = {
                          name: newChapter?.name,
                          courseId: course?.id,
                        };

                        if ((course as any)?.status === "COMPLETED") {
                          data.statusUpdate = true;
                        }

                        createChapter(data);
                      }}
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
          </TabPanel>
          {chapterList?.map((chapter: any, chapterIndex: number) => (
            <div>
              <div>
                
              </div>
              <TabPanel key={chapterIndex} id={`chapter-${chapterIndex}`}>
                <Tabs defaultTab="add-topic">
                  <TabList>
                    <Tab id="add-topic">Add Topic</Tab>
                    {chapter.topics?.map((topic: any, topicIndex: any) => (
                      <Tab key={topicIndex} id={`topic-${topicIndex}`}>
                        {topic.name}
                      </Tab>
                    ))}
                  </TabList>
                  <TabPanels>
                    <TabPanel id="add-topic">
                      <div className="bg-gray-50 p-4 rounded-md border border-black space-y-4">
                        <Input
                          id="topic-name"
                          type="text"
                          label="Topic Name"
                          value={newTopic.name}
                          onChange={(e) =>
                            setNewTopic({ ...newTopic, name: e.target.value })
                          }
                          placeholder="Enter topic name"
                        />
                        <Input
                          id="topic-description"
                          type="text"
                          label="Description"
                          value={newTopic.description}
                          onChange={(e) =>
                            setNewTopic({
                              ...newTopic,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter topic description"
                        />
                        <Input
                          id="topic-link"
                          type="text"
                          label="Link"
                          value={newTopic.link}
                          onChange={(e) =>
                            setNewTopic({ ...newTopic, link: e.target.value })
                          }
                          placeholder="Enter topic link"
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => {
                              const data: any = {
                                ...newTopic,
                                chapterId: chapter.id,
                                courseId: course?.id,
                              };

                              if ((course as any)?.status === "COMPLETED") {
                                data.statusUpdate = true;
                              }

                              createTopic(data, {
                                onSuccess: () => handleToggleTopic(false),
                              });
                            }}
                            disabled={
                              !newTopic.name.trim() ||
                              !newTopic.description.trim() ||
                              !newTopic.link.trim() ||
                              isTopicCreating
                            }
                          >
                            Create Topic
                          </Button>
                          <Button onClick={() => handleToggleTopic(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </TabPanel>
                    {chapter.topics?.map((topic: any, topicIndex: any) => (
                      <TabPanel key={topicIndex} id={`topic-${topicIndex}`}>
                        <div className="p-4">
                          <h3 className="text-lg font-medium">{topic.name}</h3>
                          <p className="text-sm text-gray-700">
                            {topic.description}
                          </p>
                          <a
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {topic.link}
                          </a>
                        </div>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </TabPanel>
            </div>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CreateCourse;
