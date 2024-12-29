"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  DeleteButton,
  EditButton,
  PageHeader,
  RenderSpace,
  VideoThumbnail,
} from "@/lib/components/shared";
import {
  Accordion,
  AccordionItem,
  Button,
  Drawer,
  Input,
  Tab,
  TabList,
  Tabs,
} from "@/lib/components/ui";
import { useCreateCourse } from "@/lib/hooks";
import ChaptersList from "./ChaptersList";
import CourseDetailsCard from "./CourseDetailsCard";
import ChapterCard from "./ChapterCard";
import { useRouter } from "next/navigation";
import TopicsCard from "./TopicsCard";

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

const CreateCourse: React.FC = ({ courseDetails, myCourse }: any) => {
  const router = useRouter();
  const [course, setCourse] = useState<Course>(courseDetails);

  const courseId = courseDetails?.id || null;

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

  const [newTopic, setNewTopic] = useState<Topic>({
    id: "",
    name: "",
    description: "",
    link: "",
  });

  const [showTopicForm, setShowTopicForm] = useState(false);

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

  const chapterList = courseDetails?.chapters;

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

  console.log({ editMode, newChapter, course });

  const {
    createChapter,
    deleteChapter,
    updateChapter,
    updateCourse,
    createTopic,
    updateTopic,
    deleteTopic,

    isChapterCreating,
    isChapterDeleting,
    isChapterUpdating,
    isTopicCreating,
    isTopicDeleting,
    isTopicUpdating,
    isCourseUpdating,
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

  const handleSubmitEdited = (e: any) => {
    e.stopPropagation();
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

  const handleEditCancelChapter = (e: any) => {
    e.stopPropagation();
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

  const handleCreateChapter = () => {
    const data: any = {
      name: newChapter?.name,
      courseId,
    };

    if ((course as any)?.status === "COMPLETED") {
      data.statusUpdate = true;
    }

    if (myCourse?.status === "COMPLETED") {
      data.myCourseStatusUpdate = true;
      data.myCourseId = myCourse?.id;
    }

    createChapter(data);
  };

  return (
    <div className="bg-gray-50 min-h-screen space-y-4">
      <div className="flex justify-between">
        <PageHeader title="Create Course" />
        <div className="flex gap-4">

        <Button
          onClick={() => {
            router.push(`/course?id=${courseId}`);
          }}
        >
          View Course
        </Button>

        <RenderSpace condition={(courseDetails as any)?.status !== "COMPLETED"}>
          <Button
            disabled={
              !course?.name ||
              course?.name?.trim()?.length < 3 ||
              isCourseUpdating
            }
            onClick={() => {
              updateCourse({
                id: courseId,
                status: "COMPLETED",
                name: course?.name,
                imageUrl: course?.imageUrl,
                isCreateMyCourse: !myCourse?.id,
              },{onSuccess : ()=> {
                router?.refresh
              } });
            }}
          >
            Create
          </Button>
        </RenderSpace>
        </div>

      </div>

      <CourseDetailsCard course={course} setCourse={setCourse} />
      <ChapterCard
        newChapter={newChapter}
        renderFinalChpterButton={renderFinalChpterButton}
        createChapter={createChapter}
        courseId={courseId}
        isChapterCreating={isChapterCreating}
        setNewChapter={setNewChapter}
        handleToggleTopic={handleToggleTopic}
        isChapterUpdating={isChapterUpdating}
        status={(course as any)?.status}
        handleCreateChapter={handleCreateChapter}
      />

      <RenderSpace condition={showTopicForm}>
        <div className=" p-4 rounded-md border border-gray-300 space-y-4">
          <h4 className="font-medium text-gray-800">
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
                  const data: any = {
                    ...rest,
                    chapterId: newChapter?.id,
                    courseId: course?.id,
                  };

                  if ((course as any)?.status === "COMPLETED") {
                    data.statusUpdate = true;
                  }

                  if (myCourse?.status === "COMPLETED") {
                    data.myCourseStatusUpdate = true;
                    data.myCourseId = myCourse?.id;
                  }

                  createTopic(data, {
                    onSuccess: () => handleToggleTopic(false),
                  });
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
          <h3 className="text-lg font-semibold text-gray-700 px-2">
            Topics Added
          </h3>
          <TopicsCard
            topics={newChapter?.topics}
            handleDelete={(id: any) => deleteTopic(id)}
            handleEdit={(index: any) =>
              handleEditCurrentTopic(index, newChapter?.topics)
            }
            deleteLoading={isTopicDeleting}
            editLoading={isTopicUpdating}
          />
        </div>
      </RenderSpace>

      <RenderSpace condition={chapterList?.length}>
        <ChaptersList
          chapters={chapterList}
          renderFinalChpterButton={renderFinalChpterButton}
          newChapter={newChapter}
          handleEditTopic={handleEditTopic}
          deleteTopic={deleteTopic}
          isTopicDeleting={isTopicDeleting}
          deleteChapter={deleteChapter}
          isChapterDeleting={isChapterDeleting}
          updateChapter={updateChapter}
          handleEditChapter={handleEditChapter}
          isChapterUpdating={isChapterUpdating}
        />
      </RenderSpace>
    </div>
  );
};

export default CreateCourse;
